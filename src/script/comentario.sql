/* 
-- 1. TABLA ROLES
/* drop table if exists public.roles; */

create table public.roles (
  id_rol uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  rol text not null default 'usuario' check (rol in ('usuario','administrador'))
);

alter table public.roles enable row level security;

/*id_rol (clave principal) será el mismo ID del usuario en Supabase Auth, references conecta esta tabla con auth.users y 
con on delete cascade si se borra un usuario se borra su rol automaticamente. */

-- 2. FUNCIÓN (SECURITY DEFINER) PARA INSERTAR EN ROLES AL CREAR USUARIO

create or replace function public.fn_insert_rol_from_auth()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.roles (id_rol, email, rol)
  values (new.id, new.email, 'usuario')
  on conflict (id_rol) do nothing;
  return new;
end;
$$;
/*Es una funcion secutiry definer(con permisos elevado), inserta un usuario en la tabla roles con rol usuario, sin conflicto si ya existe.*/

-- 3. TRIGGER SOBRE auth.users

create trigger trg_insert_rol_from_auth
after insert on auth.users
for each row
execute function public.fn_insert_rol_from_auth();

/*Un trigger es un sensor, cuando se crea un usuario ejecuto la funcion anterior.*/

-- 4. CREACIÓN DE USUARIOS (EJEMPLO TEÓRICO; EN SUPABASE NORMALMENTE SE HACE DESDE AUTH)

-- OJO: en Supabase real se usan las APIs de auth; esto es sólo para la práctica.
-- insert into auth.users (id, email, encrypted_password, raw_user_meta_data)
-- values (...);

-- Para la práctica, crea los usuarios desde el panel de Supabase:
--  display name → adminFeo, correo → jc.gomez@edu.gva.es, contraseña → Feofeofeo2@
--  display name → usuarioFeo, correo → feo@feo.es, contraseña → Feofeofeo2@

-- 5. ASIGNAR ROLES A ESOS USUARIOS (UNA VEZ CREADOS EN auth.users)

-- Supongamos que ya conoces sus UUID (id) desde el panel de Supabase:

insert into public.roles (id_rol, email, rol)
values
  ('<UUID_ADMIN_FEO>', 'jc.gomez@edu.gva.es', 'administrador')
on conflict (id_rol) do update set rol = excluded.rol;

insert into public.roles (id_rol, email, rol)
values
  ('<UUID_USUARIO_FEO>', 'feo@feo.es', 'usuario')
on conflict (id_rol) do update set rol = excluded.rol;

-- 6. POLÍTICAS RLS PARA ROLES (ADMINISTRACIÓN DE ROLES SOLO ADMIN)

-- Ver roles (solo admin)
create policy "roles_select_admin_only"
on public.roles
for select
using (
  exists (
    select 1
    from public.roles r
    where r.id_rol = auth.uid()
      and r.rol = 'administrador'
  )
);

-- Actualizar roles (solo admin)
create policy "roles_update_admin_only"
on public.roles
for update
using (
  exists (
    select 1
    from public.roles r
    where r.id_rol = auth.uid()
      and r.rol = 'administrador'
  )
)
with check (
  exists (
    select 1
    from public.roles r
    where r.id_rol = auth.uid()
      and r.rol = 'administrador'
  )
);

-- 7. POLÍTICAS RLS PARA LISTAS

-- Supongamos tabla: public.listas (id, user_id uuid references auth.users(id), ...)

alter table public.listas enable row level security;

-- El propietario puede ver/editar/borrar sus listas
create policy "listas_owner_full_access"
on public.listas
for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- Los administradores pueden ver todas las listas, pero NO editarlas ni borrarlas

create policy "listas_admin_select_all"
on public.listas
for select
using (
  exists (
    select 1
    from public.roles r
    where r.id_rol = auth.uid()
      and r.rol = 'administrador'
  )
);

-- (No creamos políticas de update/delete para admin, así que no podrán editar ni borrar)

-- 8. POLÍTICAS RLS PARA PRODUCTOS (EDICIÓN SOLO ADMIN)

-- Supongamos tabla: public.productos (id, nombre, ...)

alter table public.productos enable row level security;

-- Cualquiera puede ver productos (si quieres que sean públicos)
create policy "productos_select_all"
on public.productos
for select
using (true);

-- Solo admin puede insertar/actualizar/borrar productos
create policy "productos_admin_write"
on public.productos
for all
using (
  exists (
    select 1
    from public.roles r
    where r.id_rol = auth.uid()
      and r.rol = 'administrador'
  )
)
with check (
  exists (
    select 1
    from public.roles r
    where r.id_rol = auth.uid()
      and r.rol = 'administrador'
  )
);

-- 9. TABLA PERFILES

create table public.perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.perfiles enable row level security;

-- 10. FUNCIÓN Y TRIGGER PARA CREAR PERFIL AL CREAR USUARIO

create or replace function public.fn_create_profile_from_auth()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.perfiles (id, full_name, avatar_url, bio)
  values (new.id, new.raw_user_meta_data->>'full_name', null, null)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger trg_create_profile_from_auth
after insert on auth.users
for each row
execute function public.fn_create_profile_from_auth();

-- 11. TRIGGER PARA updated_at EN PERFILES

create or replace function public.fn_update_timestamp_perfiles()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_update_timestamp_perfiles
before update on public.perfiles
for each row
execute function public.fn_update_timestamp_perfiles();

-- 12. POLÍTICAS RLS PARA PERFILES

-- El usuario puede ver su propio perfil
create policy "perfiles_select_own_or_admin"
on public.perfiles
for select
using (
  id = auth.uid()
  or exists (
    select 1
    from public.roles r
    where r.id_rol = auth.uid()
      and r.rol = 'administrador'
  )
);

-- El usuario puede actualizar solo su propio perfil
create policy "perfiles_update_own"
on public.perfiles
for update
using (id = auth.uid())
with check (id = auth.uid());

-- Los administradores tienen acceso completo (incluido delete)
create policy "perfiles_admin_full"
on public.perfiles
for all
using (
  exists (
    select 1
    from public.roles r
    where r.id_rol = auth.uid()
      and r.rol = 'administrador'
  )
)
with check (
  exists (
    select 1
    from public.roles r
    where r.id_rol = auth.uid()
      and r.rol = 'administrador'
  )
);

-- (No se crea política de delete para usuarios normales, así que no podrán borrar su perfil)

*/
