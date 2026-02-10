import { useContext } from "react";
import {ContextoListaProductos} from "../context/ProveedorListasCompra.jsx";

const useContextoListaProductos = () => {
  const context = useContext(ContextoListaProductos);
  if (!context) {
    throw new Error("useContextoListaProductos debe usarse dentro de un ProveedorListasProductos");
  }
  return context;
};

export default useContextoListaProductos;