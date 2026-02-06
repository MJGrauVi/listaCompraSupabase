import { createContext, useState, useEffect } from "react";
import { supabaseConexion } from "../supabase/supabase.js";
import useSesion from "../hooks/useSesion.js";

const ContextoProductos = createContext();

const ProveedorProductos = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [orden, setOrden] = useState(null);
  const { usuario } = useSesion();

  const cargarProductos = async (campoOrden = null) => {
    setCargando(true);
    try {
      let query = supabaseConexion.from("productos").select("*");

      // Si el usuario está registrado y pide ordenación .
      if (usuario && campoOrden && campoOrden !== "") {
        query = query.order(campoOrden, { ascending: true });
      }
      // Si NO hay usuario, orden por nombre por defecto.
      if (!usuario) {
        query = query.order("nombre", { ascending: true });
      }
      const { data, error } = await query;
      if (error) {
        console.error("Error al obtener productos:", error);
      } else {
        setProductos(data || []);
      }
    } finally {
      setCargando(false);
    }
  };

  const guardarProducto = async (nuevoProducto) => {
    setCargando(true);
    try {
      const { data } = await supabaseConexion
        .from("productos")
        .insert(nuevoProducto);
        console.log(data);
    } catch (error) {
      throw new error();
    }finally{
      setCargando(false);
    }
  };
  const actualizarProducto = async (id, datosActualizados) => {
    try {
      const { error } = await supabaseConexion
        .from("productos")
        .update(datosActualizados)
        .eq("id", id);

      if (error) {
        console.error("Error al actualizar el producto:", error);
        return null;
      } else {
        //Cargarmos desde Supabase los datos.
        cargarProductos(orden);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const obtenerProductoPorId = async (id) => {
    const { data, error } = await supabaseConexion
      .from("productos")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      /* console.error("Error obteniendo producto:", error); */
      return null;
    }
   // console.log("Elemento.id:", data);
    return data;
    
  };

  const borrarProducto = async (id) => {
    try {
      //Borro el elemento de la BBDD.
      const { error } = await supabaseConexion
        .from("productos")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error al borrar producto:", error);
      } else {
        // Actualizamos el estado local filtrando el listado del estado previo.
        setProductos((prev) => prev.filter((p) => p.id !== id));
        //Podemmos llamar de nuevo a cargarDatos() y hacer la peticion con los datos actualizados.
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Carga inicial
  useEffect(() => {
    cargarProductos(orden);
  }, [orden, usuario]); // Recargar si el estado del usuario cambia

  return (
    <ContextoProductos.Provider
      value={{
        productos,
        cargando,
        cargarProductos,
        guardarProducto,
        setOrden,
        actualizarProducto,
        borrarProducto,
        obtenerProductoPorId
      }}
    >
      {children}
    </ContextoProductos.Provider>
  );
};

export { ContextoProductos };
export default ProveedorProductos;
