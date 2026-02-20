import { createContext, useEffect, useState } from "react";
import useContextoSesion from "../hooks/useContextoSesion.js";
import useSupabaseCrud from "../hooks/useSupabaseCrud.js";
import { supabaseConexion } from "../supabase/supabase.js";

const ContextoPerfil = createContext();

const ProveedorPerfil = ({ children }) => {
  const { usuario } = useContextoSesion();
  const { obtener, actualizar, insertar } = useSupabaseCrud();

  const [perfil, setPerfil] = useState(null);
  const [cargandoPerfil, setCargandoPerfil] = useState(true);

  const cargarPerfil = async () => {
    setCargandoPerfil(true);

    const data = await obtener("perfiles", {
      eq: ["id", usuario.id],
    });

    setPerfil(data[0]);
    setCargandoPerfil(false);
  };

  useEffect(() => {
    if (usuario) cargarPerfil();
    else setPerfil(null);
  }, [usuario]);

  const subirAvatar = async (file) => {
    //Sin no hay avatar null.
    if (!file) return null;
    const nombreArchivo = `${usuario.id}-${Date.now()}`;
    const { data, error } = await supabaseConexion.storage
      .from("avatars")
      .upload(nombreArchivo, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    const { data: urlData } = supabaseConexion.storage
      .from("avatars")
      .getPublicUrl(nombreArchivo);
    return urlData.publicUrl;
  };

  const crearPerfil = async (datos, avatarFile) => {
    let avatar_url = null;
    if (avatarFile) {
      avatar_url = await subirAvatar(avatarFile);
    }
    await insertar("perfiles", {
      id: usuario.id,
      ...datos,
      avatar_url,
    });
    await cargarPerfil();
  };

  const actualizarPerfil = async (datos, avatarFile) => {
    let avatar_url = perfil?.avatar_url;
    if (avatarFile) {
      avatar_url = await subirAvatar(avatarFile);
    }
    await actualizar("perfiles", usuario.id, {
      ...datos,
      avatar_url,
    });

    await cargarPerfil();
  };

  return (
    <ContextoPerfil.Provider
      value={{
        perfil,
        cargandoPerfil,
        actualizarPerfil,
        crearPerfil
      }}
    >
      {children}
    </ContextoPerfil.Provider>
  );
};

export { ContextoPerfil };
export default ProveedorPerfil;
