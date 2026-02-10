import { useContext } from "react";
import {ContextoListaProductos} from "../context/ProveedorListaProductos.jsx";

const useContextoListaProductos = () => {
  const context = useContext(ContextoListaProductos);
  if (!context) {
    throw new Error("useContextoListaProductos debe usarse dentro de un ProveedorListaProductos");
  }
  return context;
};

export default useContextoListaProductos;