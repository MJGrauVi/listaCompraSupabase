import React from "react";
import { createContext, useEffect, useState } from "react";
import useSupabaseCrud from "../hooks/useSupabaseCrud.js";
import useContextoSesion from "./useContextoSesion.js";

const ContextoRoles = createContext();
export const ProveedorRoles = ({ children }) => {
  const { usuario } = useContext(useContextoSesion);
  const { obtenerTodosLosRoles, actualizarRol } = useSupabaseCrud();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    async function cargar() {
      if (!usuario) return;
      const { data, error } = await obtenerTodosLosRoles();
      if (!error) setUsuarios(data);
      setCargando(false);
    }
    cargar();
  }, [usuario]);
  const cambiarRol = async (idUsuario, nuevoRol) => {
    const { error } = await actualizarRol(idUsuario, nuevoRol);
    if (!error) {
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id_usuario === idUsuario ? { ...u, rol: nuevoRol } : u,
        ),
      );
    }
  };
  return (
    <ContextoRoles.Provider value={{ usuarios, cargando, cambiarRol }}>
      {" "}
      {children}{" "}
    </ContextoRoles.Provider>
  );
};

export default ProveedorRoles;
export { ContextoRoles };
