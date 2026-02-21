/*Crear la tabla roles con usuario como rol por defecto.*/

create table public.roles ( 
    id_rol uuid primary key references auth.users(id) on delete cascade, 
    email text not null, 
    rol text not null default 'usuario' check (rol in('usuario', 'administrador'))
    );
/*drop table if exists public.roles cascade*/

alter table public.roles enable row level security;


/*Funcion security definer para insertar el rol de usuario cuando se crea un usuario en auth.users.*/

    create or replace function public.crear_rol_usuario() 
    returns trigger 
    language plpgsql 
    security definer 
    as $$ 
    begin 
        insert into public.roles (id_rol, email, rol) 
        values (new.id, new.email, 'usuario'); 
        return new; 
    end; 
    $$;

  /*Trigger para ejecutar la funcion al crear el usuario.*/  

  create trigger insertar_rol_usuario 
  after insert on auth.users 
  for each row 
  execute /* function */procedure public.crear_rol_usuario();

   



  /*Crear esta funcion, es_admin simplifica la creacion de la politicas RLS(Row Level Security).*/


create or replace function public.es_admin() 
returns boolean 
language plpgsql 
security definer 
set search_path = public 
as $$ 
begin 
return exists ( 
    select 1 
    from public.roles 
    where id_rol = auth.uid() 
    and rol = 'administrador' 
); 
end; 
$$;
/*Politicas para roles*/
/*SELECT, permitir que cada usuario lea su propio rol*/
create policy "usuario puede leer su rol" on roles for select using (id_rol = auth.uid());
/*SELECT-Admin.Permitir que el administrador lea todos los roles */
create policy "admin puede leer todos los roles" on roles for select using (public.es_admin());
/*INSERT-Permitir que el servicio (auth triggers) inserte*/
create policy "inserción desde trigger" on roles for insert with check (true);
/*UPDATE-Permitir que el administrador cambie el rol*/
create policy "admin puede actualizar roles" on roles for update using (public.es_admin()) with check (public.es_admin());


/*Politicas RLS para la tabla "productos", solo los administradores podrán gestioner los productos.*/

alter table public.productos enable row level security;

/*SELECT usuario */
create policy "todos puede ver productos" 
on public.productos 
for select 
using (true);

/*INSERT solo administrador.*/
create policy "admin puede insertar productos" 
on public.productos 
for insert 
with check (public.es_admin());

/*UPDATE solo administrador.*/
create policy "admin puede actualizar productos" 
on public.productos 
for update 
using (public.es_admin());


/*DELETE solo administrador*/
create policy "admin puede borrar productos"
on public.productos 
for delete 
using (public.es_admin());



/*Politicas RLS para la tabla "listas_compra", los administradores podrán ver las listas, pero no podrán crearlas, editarlas o borrarlas.*/
/*Los usuarios tiene CRUD completo ademas que podrán insertar productos a las mismas.*/

alter table public.listas_compra enable row level security;

/*SELECT  para usuarios y administrador*/
create policy "usuarios ven sus listas o admin ve todas" 
on public.listas_compra 
for select 
using ( 
    propietario_id = auth.uid() 
    or public.es_admin() 
);

/*INSERTAR (crear listas) solo rol usuario*/

create policy "solo usuarios crean listas" 
on public.listas_compra 
for insert
with check ( 
    propietario_id = auth.uid() 
    and not public.es_admin() 
);

/*UPDATE solo rol usuario.*/

create policy "solo dueño edita listas" 
on public.listas_compra 
for update 
using ( 
    propietario_id = auth.uid() 
    and not public.es_admin() 
);

/*DELETE solo rol usuario*/

create policy "solo dueño borra listas" 
on public.listas_compra 
for delete 
using ( 
    propietario_id = auth.uid() 
    and not public.es_admin() 
);
/**********************************LISTA_PRODUCTOS***********************************/

alter table public.lista_productos enable row level security;

/*SELECT ver productos de las listas, usuarios y administrador*/

create policy "usuario ve sus productos o admin ve todos" 
on public.lista_productos 
for select 
using ( 
    public.es_admin() 
    or lista_id in ( 
        select id from 
        public.listas_compra 
        where propietario_id = auth.uid() 
    ) 
);

/*INSERT puede solo rol usuario.*/

create policy "usuario añade productos a sus listas" 
on public.lista_productos 
for insert 
with check ( 
    not public.es_admin() 
    and lista_id in ( 
        select id from public.listas_compra 
        where propietario_id = auth.uid() 
    ) 
);

/*UPDATE solo rol usuario.*/
create policy "usuario modifica productos de sus listas" 
on public.lista_productos 
for update 
using ( 
    not public.es_admin() 
    and lista_id in ( 
        select id from public.listas_compra 
        where propietario_id = auth.uid() 
    ) 
);

/*DELETE solo rol usuario*/
create policy "usuario borra productos de sus listas" 
on public.lista_productos 
for delete 
using ( 
    not public.es_admin() 
    and lista_id in ( 
        select id from public.listas_compra 
        where propietario_id = auth.uid() 
    ) 
);

/********************************** PERFILES ****************************************/
/*Cear tabla perfiles*/

create table public.perfiles ( 
  id uuid primary key references auth.users(id) on delete cascade, 
  avatar_url text, nombre_completo text, 
  descripcion text
 );



/*Políticas RLS para la tabla "perfiles", administrador acceso completo, usuario CRUD menos DELETE.*/

alter table public.perfiles enable row level security;

/*SELECT usuario ve su perfil y administrador todos.*/

create policy "usuario ve su perfil o admin ve todos" 
on public.perfiles 
for select 
using ( 
    id = auth.uid() 
    or public.es_admin() 
);
/*INSERT , solo cuando se crea el perfil, normalmente por trigger)*/

create policy "solo usuario crea su perfil" 
on public.perfiles 
for insert 
with check (
    id = auth.uid()
);

/*UPDATE perfil, usuario y administrador.*/

create policy "usuario actualiza su perfil o admin" 
on public.perfiles 
for update 
using ( 
    id = auth.uid() 
    or public.es_admin() 
);

/*DELETE solo rol administrador.*/
create policy "solo admin borra perfiles" 
on public.perfiles 
for delete 
using (
    public.es_admin()
);
/********************************BUCKET**************************************************/



/***********************************Varios***********************************************/
/*Ver usuarios en Auth.users*/
select id, email from auth.users;

/*Ver que usuarios tienen rol*/
select * from public.roles;

/*Insertar rol a los usuarios que no lo tienen*/
insert into public.roles (id_rol, correo, rol) 
select u.id, u.email, 'usuario' 
from auth.users u left join public.roles r on r.id_rol = u.id 
where r.id_rol is null;

/*Insertar rol a un usuario concreto*/
insert into public.roles (id_rol, correo, rol) values ('ID_DEL_USUARIO', 'email@ejemplo.com', 'usuario');

insert into public.roles (id_rol, correo, rol) values ('ID_DEL_USUARIO', 'email@ejemplo.com', 'administrador');

/*ver la tabla ordenada por email.*/
select * from public.roles order by correo;