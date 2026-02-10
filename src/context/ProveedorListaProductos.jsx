import { createContext, useState } from "react";
import useSupabaseCrud from "../hooks/useSupabaseCrud.js";

const ContextoListaProductos = createContext();

const ProveedorListaProductos = ({ children }) => {
  const { obtener, insertar, borrar, actualizar } = useSupabaseCrud();

  const [productosLista, setProductosLista] = useState([]);

  const cargarProductosDeLista = async (listaId) => {
    const data = await obtener("lista_productos", {
      eq: ["lista_id", listaId]
    });
    setProductosLista(data);
    return data;
  };

  const agregarProductoALista = async (listaId, productoId, cantidad) => {
    return await insertar("lista_productos", {
      lista_id: listaId,
      producto_id: productoId,
      cantidad
    });
  };

  const eliminarProductoDeLista = async (idRelacion) => {
    return await borrar("lista_productos", idRelacion);
  };

  const actualizarCantidad = async (idRelacion, nuevaCantidad) => {
    return await actualizar("lista_productos", idRelacion, {
      cantidad: nuevaCantidad
    });
  };

  return (
    <ContextoListaProductos.Provider
      value={{
        productosLista,
        cargarProductosDeLista,
        agregarProductoALista,
        eliminarProductoDeLista,
        actualizarCantidad
      }}
    >
      {children}
    </ContextoListaProductos.Provider>
  );
};
export default ProveedorListaProductos;
export {ContextoListaProductos};
