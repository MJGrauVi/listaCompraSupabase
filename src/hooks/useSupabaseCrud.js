import { useState } from "react";
import { supabaseConexion } from "../supabase/supabase.js";

//Se encarga de lógica de c´nexión, errores y carga.
const useSupabaseCrud = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // GET
  const obtener = async (tabla, opciones = {}) => {
    setCargando(true);
    setError(null);
    try {
      let query = supabaseConexion.from(tabla).select("*");

      //Ordenación .
      if (opciones.orderBy) {
        query = query.order(opciones.orderBy, { ascending: true });
      }
      // Filtro eq
      if (opciones.eq) {
        const [campo, valor] = opciones.eq;
        query = query.eq(campo, valor);
      }
      //Filtro ilike (búsqueda por texto)
      if (opciones.ilike) {
        const [campo, valor] = opciones.ilike;
        query = query.ilike(campo, valor);
      }
      // Filtro gte (>=)
      if (opciones.gte) {
        const [campo, valor] = opciones.gte;
        query = query.gte(campo, valor);
      }
      // Filtro lte (<=)
      if (opciones.lte) {
        const [campo, valor] = opciones.lte;
        query = query.lte(campo, valor);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  // INSERT
  const insertar = async (tabla, body) => {
    setCargando(true);
    setError(null);

    try {
      const { data, error } = await supabaseConexion
        .from(tabla)
        .insert(body)
        .select();

      if (error) throw error;

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  // Actualizar un elemento de la tabla
  const actualizar = async (tabla, id, body) => {
    setCargando(true);
    setError(null);

    try {
      const { data, error } = await supabaseConexion
        .from(tabla)
        .update(body)
        .eq("id", id)
        .select();

      if (error) throw error;

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  // DELETE
  const borrar = async (tabla, id) => {
    setCargando(true);
    setError(null);

    try {
      const { error } = await supabaseConexion
        .from(tabla)
        .delete()
        .eq("id", id);

      if (error) throw error;

      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  const obtenerPerfil = async (idUsuario) => {
    return await supabaseConexion
      .from("perfiles")
      .select("*")
      .eq("id", idUsuario)
      .single();
  };
  const actualizarPerfil = async (idUsuario, datos) => {
    return await supabaseConexion
      .from("perfiles")
      .update(datos)
      .eq("id", idUsuario);
  };

  return {
    cargando,
    error,
    obtener,
    insertar,
    actualizar,
    borrar,
  };
};

export default useSupabaseCrud;
