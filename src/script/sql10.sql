/* ============================================================
1. TABLA ROLES
Guarda el rol de cada usuario (usuario / administrador)
============================================================ */
drop table if exists public.roles cascade;

create table public.roles (
  id_rol uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  rol text not null default 'usuario' check (rol in ('usuario', 'administrador'))
);

alter table public.roles enable row level security;

/* ============================================================
2. FUNCIÓN PARA INSERTAR AUTOMÁTICAMENTE EL ROL AL CREAR USUARIO
============================================================ */
create or replace function public.insertar_rol() 
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

/* ============================================================
3. TRIGGER QUE EJECUTA LA FUNCIÓN AL CREAR UN USUARIO
============================================================ */
drop trigger if exists trg_insertar_rol on auth.users; 

create trigger trg_insertar_rol
after insert on auth.users 
for each row 
execute function public.insertar_rol();

/* ============================================================
4. POLÍTICAS RLS PARA LA TABLA ROLES
Solo los administradores pueden ver y modificar roles
============================================================ */
-- 4.1 Permitir INSERT desde el trigger (imprescindible para evitar error 500)

create policy "roles_insert_trigger" 
on public.roles 
for insert 
with check (true);

-- 4.2 Cada usuario puede ver su propio rol 
create policy "roles_ver_propio" 
on public.roles 
for select 
using (auth.uid() = id_rol); 

-- 4.3 Solo administradores pueden ver todos los roles 

create policy "roles_admin_ver_todos" 
on public.roles 
for select 
using ( 
  exists ( 
    select 1 from public.roles r 
    where r.id_rol = auth.uid() 
    and r.rol = 'administrador' 
  ) 
); 
    -- 4.4 Solo administradores pueden modificar roles
    
    create policy "roles_admin_modificar" 
    on public.roles 
    for update 
    using ( 
      exists ( 
        select 1 from public.roles r 
        where r.id_rol = auth.uid() and r.rol = 'administrador' 
      ) 
    ) 
    with check ( 
      exists ( 
        select 1 from public.roles r 
         where r.id_rol = auth.uid() 
        and r.rol = 'administrador' 
      ) 
    );
/************************************************************************************************/


/* ============================================================
   5. POLÍTICAS RLS PARA LISTAS DE LA COMPRA
   - El usuario solo puede ver/editar/borrar sus listas
   - El administrador puede ver todas, pero NO editarlas
   ============================================================ */

alter table public.listas enable row level security;

-- Propietario: acceso total
create policy "listas_propietario_total"
on public.listas
for all
using (id_usuario = auth.uid())
with check (id_usuario = auth.uid());

-- Administrador: solo lectura
create policy "listas_admin_ver_todas"
on public.listas
for select
using (
  exists (
    select 1 from public.roles r
    where r.id_usuario = auth.uid()
      and r.rol = 'administrador'
  )
);


/* ============================================================
   6. POLÍTICAS RLS PARA PRODUCTOS
   - Cualquiera puede ver productos
   - Solo administradores pueden crear/editar/borrar
   ============================================================ */

alter table public.productos enable row level security;

create policy "productos_ver_todos"
on public.productos
for select
using (true);

create policy "productos_admin_editar"
on public.productos
for all
using (
  exists (
    select 1 from public.roles r
    where r.id_usuario = auth.uid()
      and r.rol = 'administrador'
  )
)
with check (
  exists (
    select 1 from public.roles r
    where r.id_usuario = auth.uid()
      and r.rol = 'administrador'
  )
);


/* ============================================================
   7. TABLA PERFILES
   Cada usuario tiene un perfil editable
   ============================================================ */

create table public.perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre_completo text,
  avatar_url text,
  descripcion text,
  creado_en timestamptz default now(),
  actualizado_en timestamptz default now()
);

alter table public.perfiles enable row level security;


/* ============================================================
   8. FUNCIÓN Y TRIGGER PARA CREAR PERFIL AUTOMÁTICAMENTE
   ============================================================ */

create or replace function public.fn_crear_perfil()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.perfiles (id, nombre_completo)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger trg_crear_perfil
after insert on auth.users
for each row
execute function public.fn_crear_perfil();


/* ============================================================
   9. TRIGGER PARA ACTUALIZAR "actualizado_en"
   ============================================================ */

create or replace function public.fn_actualizar_timestamp_perfiles()
returns trigger
language plpgsql
as $$
begin
  new.actualizado_en = now();
  return new;
end;
$$;

create trigger trg_actualizar_timestamp_perfiles
before update on public.perfiles
for each row
execute function public.fn_actualizar_timestamp_perfiles();


/* ============================================================
   10. POLÍTICAS RLS PARA PERFILES
   - Usuario: ver y editar solo su perfil
   - Administrador: acceso total
   ============================================================ */

-- Ver perfil propio o cualquier si eres admin
create policy "perfiles_ver"
on public.perfiles
for select
using (
  id = auth.uid()
  or exists (
    select 1 from public.roles r
    where r.id_usuario = auth.uid()
      and r.rol = 'administrador'
  )
);

-- Editar solo tu propio perfil
create policy "perfiles_editar_propio"
on public.perfiles
for update
using (id = auth.uid())
with check (id = auth.uid());

-- Administrador: acceso total
create policy "perfiles_admin_total"
on public.perfiles
for all
using (
  exists (
    select 1 from public.roles r
    where r.id_usuario = auth.uid()
      and r.rol = 'administrador'
  )
)
with check (
  exists (
    select 1 from public.roles r
    where r.id_usuario = auth.uid()
      and r.rol = 'administrador'
  )
);

