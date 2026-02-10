// context/ProveedorListas.jsx
import { createContext, useState, useEffect } from "react";
import useSupabaseCrud from "../hooks/useSupabaseCrud.js";
import useSesion from "../hooks/useContextoSesion.js";

const ContextoListasCompra = createContext();

const ProveedorListasCompra = ({ children }) => {
  const [listasCompra, setListasCompra] = useState([]);
  const [orden, setOrden] = useState("nombre_lista");
 

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
      }}
    >
      {children}
    </ContextoListasCompra.Provider>
  );
};

export { ContextoListasCompra };
export default ProveedorListasCompra;
