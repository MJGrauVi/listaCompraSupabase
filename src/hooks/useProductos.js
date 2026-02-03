import { useContext } from "react";
import ProductosContext from "../context/ProveedorProductos.jsx";

//useProductos es un hook que centralizar el acceso a la información y acciones 
// relacionadas con los productos, evita el uso directo de useContext en los componentes 
// y mejora la mantenibilidad del código.
//Si cambiamos el contexto( nombre, estructura, lógica) no se rompen los componentes.

const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error("useProductos debe usarse dentro de un ProveedorProductos");
  }
  return context;
};

export default useProductos;