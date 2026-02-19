import { useContext } from "react";
import { ContextoPerfil } from "../context/ProveedorPerfil.jsx";

const useContextoPerfil = () => {
  const contexto = useContext(ContextoPerfil);
  if (!contexto) {
    throw new Error("useContextoPerfil debe usarse dentro de un ProveedorPerfil");
  }
  return contexto;
};

export default useContextoPerfil;
