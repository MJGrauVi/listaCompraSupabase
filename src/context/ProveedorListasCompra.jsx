// context/ProveedorListas.jsx
import { createContext, useState, useEffect } from "react";
import useSupabaseCrud from "../hooks/useSupabaseCrud.js";
import useSesion from "../hooks/useContextoSesion.js";
import { supabaseConexion } from "../supabase/supabase.js";


const ContextoListasCompra = createContext();

const ProveedorListasCompra = ({ children }) => {
  const [listasCompra, setListasCompra] = useState([]);
  const [orden, setOrden] = useState("nombre_lista");
  const [detalleListaCompra, setDetalleListaCompra] = useState([]);
 

  const { usuario } = useSesion();
  const { error, obtener, insertar, actualizar, borrar, cargando } = useSupabaseCrud();

  // Cargar todas las listas
  const cargarListasCompra = async () => {
    if (!usuario) {
      setListasCompra([]);
      return;
    }

    const datos = await obtener("listas_compra", {
      orderBy: orden,
    });

    setListasCompra(datos || []);
   
  };

  // Crear lista
  const guardarListaCompra = async (nuevaLista) => {
    await insertar("listas_compra", nuevaLista);
    await cargarListasCompra(); // recargar después de crear
  };

  // Editar lista
  const actualizarListaCompra = async (id, datosActualizados) => {
    await actualizar("listas_compra", id, datosActualizados);
    await cargarListasCompra(); // recargar después de editar
  };

  // Borrar lista
  const borrarListaCompra = async (id) => {
    await borrar("listas_compra", id);
    await cargarListasCompra(); // recargar después de borrar
  };

  // Obtener una lista por ID
  const obtenerListaCompraPorId = async (id) => {
    const datos = await obtener("listas_compra", { eq: ["id", id] });
    return datos?.[0] || null;
  };

  // Filtrar listas
  const filtrarListaCompra = async ({ nombreLista }) => {
    const filtros = {};
    if (nombreLista) filtros.ilike = ["nombre_lista", `%${nombreLista}%`];

    const datos = await obtener("listas_compra", filtros);
    return datos || [];
  };

  //Utilizamos la conexion a supabase para este caso concreto.
  //Porque el hook de conexion no esta preparado,usamos una tabla intermedia y select embebido.
  const cargarDetalleListaCompra = async (idListaCompra)=>{
    if(!usuario) return;
    const {data, error} = await supabaseConexion
    .from("lista_productos")
    .select(`cantidad, productos(id, nombre, precio, peso)`)
    .eq("lista_id", idListaCompra);

    if(!error){
      setDetalleListaCompra(data || [])
    }
  }

  // Cargar al iniciar o cuando cambia el usuario o el orden
  useEffect(() => {
    cargarListasCompra();
  }, [usuario, orden]);

  return (
    <ContextoListasCompra.Provider
      value={{
        listasCompra,
        cargando,
        error,
        cargarListasCompra,
        guardarListaCompra,
        actualizarListaCompra,
        borrarListaCompra,
        obtenerListaCompraPorId,
        filtrarListaCompra,
        setOrden,
        detalleListaCompra,
        cargarDetalleListaCompra
      }}
    >
      {children}
    </ContextoListasCompra.Provider>
  );
};

export { ContextoListasCompra };
export default ProveedorListasCompra;
