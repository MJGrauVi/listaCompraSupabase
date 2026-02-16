import React from 'react';
import { useState } from 'react';
import useContextoSesion from "../context/useContextoSesion.js";



const AdminRoles = () => {

  const {usuario} = useContextoSesion();
  const [usuarios, setUsuarios]=useState([]);


/**
   * Gestión de roles de usuario en Supabase.
   *
   * Dos opciones:
   *  -> utilizar la gestión de roles que ofrece Supabase (limitada y confusa),
   *  -> gestionar los roles al margen de Supabase (escalable, personalizada y separada de la API).
   *
   * Dos enfoques:
   *  -> seguridad real (en el servicio BaaS de Supabase),
   *  -> expreriencia de usuario/a (ocultar los elementos de interfaz).
   *
   * Pasos a seguir:
   *  -> creación de la tabla Roles (en el perfil public de Supabase):
   *      -> con una FK a auth.users.id (para que no existan roles a usuarios no existentes),
   *      -> con DELETE CASCADE para que cuando se elimine un usuario también lo hagan sus roles,
   *  -> automatizar la creación de los roles con una función "Security Definer" (INSERT) que será ejecutada a través de la
   *  -> creación de un disparador (trigger)(nunca a mano en la parte del cliente) para ejecutar esa función,
   *  -> crear una función para comprobar roles (return boolean) y
   *  -> proteger la información con RLS (para las tablas involucradas).
   *
   * Código PL/SQL de muestra.
   *
   *  -> creación de funciones:
   *
   *        create or replace function public.insertar_feo()
   *        returns trigger as $$
   *        begin
   *          insert into public.rolesfeos (id_rol, correo, rol)
   *          values (new.id, new.email, 'usuario');
   *          return new;
   *        end;
   *        $$ language plpgsql security definer;
   *
   *  -> creación de disparadores:
   *
   *        create trigger al_crear_usuario_feo
   *         after insert on auth.users
   *         for each row execute procedure public.insertar_feo();
   *
   *  -> creación de función para comprobación de roles:
   *
   *        create or replace function public.soy_feo()
   *        returns boolean as $$
   *        begin
   *          return exists (
   *          select 1
   *          from public.roles
   *          where id_rol = auth.uid()
   *          and rol = 'feo'
   *          );
   *        end;
   *        $$ language plpgsql security definer set search_path = public;
   *
   */


  return (
    <div>
      <h2>Gestion de roles de usuarios.</h2>
    </div>
  )
}

export default AdminRoles;