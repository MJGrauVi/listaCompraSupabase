import { createContext, useState, useEffect } from "react";
import { supabaseConexion } from "../supabase/supabase.js";
import useSesion from "../hooks/useSesion.js";

const ContextoProductos = createContext();

const ProveedorProductos = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [orden, setOrden] = useState(null);
  const { usuario } = useSesion();
  console.log("El usuario: ", usuario);

  // Función principal para obtener datos
  /*   const cargarProductos = async () => {
    setCargando(true);
    const { data, error } = await supabaseConexion
      .from("productos")
      .select("*")

    if (error) {
      console.error("Error al obtener productos:", error)
    } else {
      console.log("Productos:", data) // Ver en consola.
      setProductos(data || []);
      setCargando(false);
    }
  } */

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

  // Carga inicial
  useEffect(() => {
    cargarProductos(orden);
  }, [orden, usuario]); // Recargar si el estado del usuario cambia

  return (
    <ContextoProductos.Provider
      value={{ productos, cargando, cargarProductos, setOrden }}
    >
      {children}
    </ContextoProductos.Provider>
  );
};

export { ContextoProductos };
export default ProveedorProductos;
