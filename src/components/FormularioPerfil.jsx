import { useState, useEffect } from "react";
import useContextoPerfil from "../hooks/useContextoPerfil.js";
import Cargando from "./Cargando.jsx";
import "./FormularioPerfil.css";

const FormularioPerfil = () => {
  const { perfil, cargandoPerfil, actualizarPerfil } = useContextoPerfil();

  const valoresIniciales = {
    nombre_completo: "",
    descripcion: "",
    avatar_url: "",
  };

  const [form, setForm] = useState(valoresIniciales);
  const [avatarFile, setAvatarFile] = useState(null);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

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
      await actualizarPerfil(form, avatarFile);
      setMensaje({ tipo: "exito", texto: "Perfil actualizado correctamente." });
    } catch (err) {
      console.error(err);
      setMensaje({ tipo: "error", texto: "Error al guardar el perfil." });
    }
  };

  return (
    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
      {/* <div className="contenedor-perfil"> */}
      <h2>Editar Perfil</h2>

      <div className="avatar-contenedor">
       
        <img
          src={form.avatar_url || "https://via.placeholder.com/150"}
          className="avatar-img"
          alt="Avatar"
        />
      </div>

      <form onSubmit={manejarEnvio} className="formulario-perfil">
        <input type="file" onChange={(e) => setAvatarFile(e.target.files[0])} />

        <input
          type="text"
          name="nombre_completo"
          value={form.nombre_completo}
          onChange={actualizarDato}
          placeholder="Nombre completo"
        />

        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={actualizarDato}
          placeholder="Descripción"
        />

        <button type="submit">Actualizar Perfil</button>
      </form>

      {mensaje.texto && (
        <div className={`mensaje ${mensaje.tipo}`}>{mensaje.texto}</div>
      )}
    </div>
  );
};

export default FormularioPerfil;
