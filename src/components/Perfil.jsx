import { useState } from "react";
import useContextoPerfil from "../hooks/useContextoPerfil.js";
import Cargando from "./Cargando.jsx";

const Perfil = () => {
  const { perfil, cargandoPerfil, actualizarPerfil } = useContextoPerfil();

  const [nombre, setNombre] = useState(perfil?.nombre_completo || "");
  const [descripcion, setDescripcion] = useState(perfil?.descripcion || "");
  const [avatarFile, setAvatarFile] = useState(null);

  if (cargandoPerfil) return <Cargando />;

  const guardar = () => {
    actualizarPerfil(
      { nombre_completo: nombre, descripcion },
      avatarFile
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>

      <img
        src={perfil.avatar_url || "https://via.placeholder.com/150"}
        className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
      />

      <input type="file" onChange={(e) => setAvatarFile(e.target.files[0])} />

      <input
        className="w-full border p-2 mt-4"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <textarea
        className="w-full border p-2 mt-4"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <button
        onClick={guardar}
        className="w-full bg-blue-600 text-white py-2 mt-4 rounded"
      >
        Guardar cambios
      </button>
    </div>
  );
};

export default Perfil;
