// context/ProveedorProductos.jsx
import { createContext, useState, useEffect } from "react";
import useSupabaseCrud from "../hooks/useSupabaseCrud.js";
import useSesion from "../hooks/useContextoSesion.js";

//
const ContextoProductos = createContext();

const ProveedorProductos = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [orden, setOrden] = useState(null);

  const { usuario } = useSesion();
  const { cargando, error, obtener, insertar, actualizar, borrar } =
    useSupabaseCrud();

  // Cargar productos con orden dinámico.
  const cargarProductos = async (campoOrden = null) => {
    let orderBy;
    if (usuario) {
      // Si hay usuario usa el orden indicado o uno por defecto .
      orderBy = campoOrden || "nombre";
    } else {
      // Si NO hay usuario ordena por precio.
      orderBy = "precio"; // o "nombre", o "peso", fecha creacion.
    }
    const datos = await obtener("productos", { orderBy });
    setProductos(datos || []);
  };

  // Crear producto
  const guardarProducto = async (nuevoProducto) => {
    await insertar("productos", nuevoProducto);
    await cargarProductos(orden);
  };

  // Actualizar producto
  const actualizarProducto = async (id, datosActualizados) => {
    await actualizar("productos", id, datosActualizados);
    await cargarProductos(orden);
  };

  // Borrar producto
  const borrarProducto = async (id) => {
    await borrar("productos", id);
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  // Obtener un producto por ID
  const obtenerProductoPorId = async (id) => {
    const datos = await obtener("productos", { eq: ["id", id] });

    return datos?.[0] || null;
  };

  const filtrarProductos = async ({
    nombre,
    precioMin,
    precioMax,
    pesoMin,
    pesoMax,
  }) => {
    const filtros = {};
    if (nombre) filtros.ilike = ["nombre", `%${nombre}%`];
    if (precioMin !== undefined) filtros.gte = ["precio", precioMin];
    if (precioMax !== undefined) filtros.lte = ["precio", precioMax];
    if (pesoMin !== undefined) filtros.gte = ["peso", pesoMin];
    if (pesoMax !== undefined) filtros.lte = ["peso", pesoMax];
    return await obtener("productos", filtros);
  };
  // Carga inicial y recarga cuando cambia el orden o el usuario
  useEffect(() => {
    cargarProductos(orden);
  }, [orden, usuario]);

  return (
    <ContextoProductos.Provider
      value={{
        productos,
        cargando,
        error,
        cargarProductos,
        guardarProducto,
        actualizarProducto,
        borrarProducto,
        obtenerProductoPorId,
        setOrden,
        filtrarProductos,
      }}
    >
      {children}
    </ContextoProductos.Provider>
  );
};

export { ContextoProductos };
export default ProveedorProductos;
