import { useState, useEffect } from "react";
import useContextoPerfil from "../hooks/useContextoPerfil.js";
import Cargando from "./Cargando.jsx";

const FormularioPerfil = () => {
  const { perfil, cargandoPerfil, actualizarPerfil, crearPerfil } = useContextoPerfil();

  const esEdicion = !!perfil; // si existe perfil → edición

  const valoresIniciales = {
    nombre_completo: "",
    descripcion: "",
    avatar_url: "",
  };

  const [form, setForm] = useState(valoresIniciales);
  const [avatarFile, setAvatarFile] = useState(null);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  // Cargar datos si estamos editando
  useEffect(() => {
    if (perfil) {
      setForm({
        nombre_completo: perfil.nombre_completo || "",
        descripcion: perfil.descripcion || "",
        avatar_url: perfil.avatar_url || "",
      });
    }
  }, [perfil]);

  if (cargandoPerfil) return <Cargando />;

  const actualizarDato = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMensaje({ tipo: "", texto: "" });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      if (esEdicion) {
        await actualizarPerfil(form, avatarFile);
        setMensaje({ tipo: "exito", texto: "Perfil actualizado correctamente." });
      } else {
        await crearPerfil(form, avatarFile);
        setMensaje({ tipo: "exito", texto: "Perfil creado correctamente." });
      }
    } catch (err) {
      console.error(err);
      setMensaje({ tipo: "error", texto: "Error al guardar el perfil." });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        {esEdicion ? "Editar Perfil" : "Crear Perfil"}
      </h2>

      <img
        src={form.avatar_url || "https://via.placeholder.com/150"}
        className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
      />

      <form onSubmit={manejarEnvio}>
        <input
          type="file"
          onChange={(e) => setAvatarFile(e.target.files[0])}
          className="w-full mt-2"
        />

        <input
          type="text"
          name="nombre_completo"
          value={form.nombre_completo}
          onChange={actualizarDato}
          className="w-full border p-2 mt-4"
          placeholder="Nombre completo"
        />

        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={actualizarDato}
          className="w-full border p-2 mt-4"
          placeholder="Descripción"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded"
        >
          {esEdicion ? "Actualizar Perfil" : "Crear Perfil"}
        </button>
      </form>

      {mensaje.texto && (
        <div
          className={`mt-4 p-2 text-center rounded ${
            mensaje.tipo === "exito" ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {mensaje.texto}
        </div>
      )}
    </div>
  );
};

export default FormularioPerfil;
