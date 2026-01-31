import { useContext } from "react";
import ProductosContext from "../context/ProveedorProductos";

const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error("useProductos debe usarse dentro de un ProveedorProductos");
  }
  return context;
};

export default useProductos;