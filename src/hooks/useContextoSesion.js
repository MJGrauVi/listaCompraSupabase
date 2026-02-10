import { useContext } from "react";
import { ContextoSesion } from "../context/ProveedorSesion.jsx";

const useContextoSesion = () => {
  const contexto = useContext(ContextoSesion);
  if (!contexto) {
    throw new Error("useContextoSesion debe usarse dentro de un ProveedorSesion");
  }
  return contexto;
};
export default useContextoSesion;
