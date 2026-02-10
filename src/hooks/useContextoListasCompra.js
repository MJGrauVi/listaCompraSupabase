import { useContext } from "react";
import {ContextoListasCompra} from "../context/ProveedorListasCompra.jsx";

//useContextoDatos es un hook que centralizar el acceso a la información y acciones 
// relacionadas con los datos, evita el uso directo de useContext en los componentes 
// y mejora la mantenibilidad del código.
//Si cambiamos el contexto( nombre, estructura, lógica) no se rompen los componentes.

const useContextoListasCompra = () => {
  const context = useContext(ContextoListasCompra);
  if (!context) {
    throw new Error("useContextoListasCompra debe usarse dentro de un ProveedorListasCompra");
  }
  return context;
};

export default useContextoListasCompra;