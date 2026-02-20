import { useState } from "react";
import useContextoPerfil from "../hooks/useContextoPerfil.js";
import Cargando from "./Cargando.jsx";
import FormularioPerfil from "./FormularioPerfil.jsx";

const Perfil = () => {
  const { perfil, cargandoPerfil } = useContextoPerfil();
  const [editando, setEditando] = useState(false);

  if (cargandoPerfil || !perfil) return <Cargando />;
  if (!perfil) return <FormularioPerfil modo="crear" />;

  if (editando) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <FormularioPerfil />
        <button
          onClick={() => setEditando(false)}
          className="w-full bg-gray-500 text-white py-2 mt-4 rounded"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>

      <img
        src={perfil.avatar_url || "https://via.placeholder.com/150"}
        className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
      />

      <h3 className="text-xl font-semibold">{perfil.nombre_completo}</h3>

      <p className="mt-2 text-gray-700">{perfil.descripcion}</p>

      <button
        onClick={() => setEditando(true)}
        className="w-full bg-blue-600 text-white py-2 mt-6 rounded"
      >
        Editar Perfil
      </button>
    </div>
  );
};

export default Perfil;
