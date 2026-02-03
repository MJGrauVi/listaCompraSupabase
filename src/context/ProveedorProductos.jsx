import { createContext, useState, useEffect} from "react";
import { supabaseConexion } from "../supabase/supabase.js";
import useSesion from "../hooks/useSesion.js"; 

const ContextoProductos = createContext();

const ProveedorProductos = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const { usuario } = useSesion();
   console.log("El usuario: ", usuario); 

  // Función principal para obtener datos
  const cargarProductos = async () => {
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
  }


/*   const cargarProductos = async (filtros = {}, orden = { campo: 'nombre', ascendente: true }) => {
    setCargando(true);
     try {
      let query = supabaseConexion.from("productos").select("*");

      // Solo aplicamos filtros y orden si el usuario está registrado
      if (usuario) {
        // Filtros simples (uno a la vez según enunciado)
        if (filtros.nombre) {
          query = query.ilike("nombre", `%${filtros.nombre}%`);
        } else if (filtros.precio) {
          query = query.lte("precio", filtros.precio); // Menor o igual
        } else if (filtros.peso) {
          query = query.lte("peso", filtros.peso); // Menor o igual
        }

        // Ordenación
        query = query.order(orden.campo, { ascending: orden.ascendente });
      } else {
        // Comportamiento por defecto para no registrados
        query = query.order("nombre", { ascending: true });
      }

      const { data, error } = await query;
      if (error) throw error;
      setProductos(data);
    } catch (error) {
      console.error("Error cargando productos:", error.message);
    } finally {
      setCargando(false);
    } 
  };
   */
/*     const editarProducto = async (id, datos) => {
    await editarDatosCompleto(`${URL_API}/${id}`, datos);
    await cargarDiscos();
  }; */

  // Carga inicial
  useEffect(() => {
    cargarProductos();
  }, []); // Recargar si el estado del usuario cambia

  return (
    <ContextoProductos.Provider value={{ productos, cargando, cargarProductos/* , editarProducto */ }}>
      {children}
    </ContextoProductos.Provider>
  );
};

export {ContextoProductos};
export default ProveedorProductos;