create table public.perfiles ( 
    id uuid primary key references auth.users(id) on delete cascade, 
    avatar_url text, 
    nombre_completo text, 
    descripcion text 
    );