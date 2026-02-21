import { useState } from "react";
import useContextoPerfil from "../hooks/useContextoPerfil.js";
import Cargando from "./Cargando.jsx";
import FormularioPerfil from "./FormularioPerfil.jsx";
import "./Perfil.css";

const Perfil = () => {
  const { perfil, cargandoPerfil } = useContextoPerfil();
  const [editando, setEditando] = useState(false);

  // Si está cargando muestra el spinner.
  if (cargandoPerfil) return <Cargando />;

  // El perfil se genera al cargar perfil con datos en blanco, aqui podemos editarlo.
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

  // Muestra el perfíl.
  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>

      <div className="avatar-contenedor">
        
        <img
          src={perfil.avatar_url || "https://via.placeholder.com/150"}
          className="avatar-img"
          alt="Avatar"
        />
      </div>

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
