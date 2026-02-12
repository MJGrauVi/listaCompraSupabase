// context/ProveedorPerfil.jsx

import { createContext, useContext, useEffect, useState } from "react";
import useSupabaseAuth from "../hooks/useSupabaseAuth.jsx";
import useSupabaseCrud from "../hooks/useSupabaseCrud";

const ContextoPerfil = createContext();

export const ProveedorPerfil = ({ children }) => {
  const { usuario } = useSupabaseAuth(); // viene del ProveedorSesion
  const { obtenerPerfil, actualizarPerfil } = useSupabaseCrud();

  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Cargar perfil al iniciar sesión
  useEffect(() => {
    async function cargar() {
      if (!usuario) {
        setPerfil(null);
        setCargando(false);
        return;
      }

      const { data, error } = await obtenerPerfil(usuario.id);

      if (error) setError(error.message);
      else setPerfil(data);

      setCargando(false);
    }

    cargar();
  }, [usuario]);

  const guardarPerfil = async () => {
    const { error } = await actualizarPerfil(usuario.id, perfil);
    if (error) setError(error.message);
  };

  return (
    <ContextoPerfil.Provider
      value={{
        perfil,
        setPerfil,
        cargando,
        error,
        guardarPerfil,
      }}
    >
      {children}
    </ContextoPerfil.Provider>
  );
};

export const usePerfilContexto = () => useContext(ContextoPerfil);
