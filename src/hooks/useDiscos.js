import { useContext } from "react";
import { ContextoDiscos } from "../context/ProveedorDiscos.jsx";

const useDiscos = () => {
  const contexto = useContext(ContextoDiscos);
  if (!contexto) {
    throw new Error("useDiscos debe usarse dentro de un ProveedorDiscos");
  }
  return contexto;
};
export default useDiscos;
