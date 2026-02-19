import { createContext, useContext, useEffect, useState } from "react";
import { ContextoSesion } from "./ProveedorSesion.jsx";
import useSupabaseCrud from "../hooks/useSupabaseCrud";
import { supabaseConexion } from "../supabase/supabase";

const ContextoPerfil = createContext();

const ProveedorPerfil = ({ children }) => {
  const { usuario } = useContext(ContextoSesion);
  const { obtener, actualizar } = useSupabaseCrud();

  const [perfil, setPerfil] = useState(null);
  const [cargandoPerfil, setCargandoPerfil] = useState(true);

  const cargarPerfil = async () => {
    setCargandoPerfil(true);

    const data = await obtener("perfiles", {
      eq: ["id", usuario.id]
    });

    setPerfil(data[0]);
    setCargandoPerfil(false);
  };

  useEffect(() => {
    if (usuario) cargarPerfil();
    else setPerfil(null);
  }, [usuario]);

  const subirAvatar = async (file) => {
    if (!file) return perfil.avatar_url;

    const ext = file.name.split(".").pop();
    const fileName = `${usuario.id}.${ext}`;
    const filePath = `avatars/${fileName}`;

    await supabaseConexion.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    const { data } = supabaseConexion.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const actualizarPerfil = async (datos, avatarFile) => {
    const avatar_url = await subirAvatar(avatarFile);

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
      }}
    >
      {children}
    </ContextoPerfil.Provider>
  );
};

export { ContextoPerfil };
export default ProveedorPerfil;
