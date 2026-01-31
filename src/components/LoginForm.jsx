import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import Mensaje from "./Mensaje.jsx";
import useSesion from "../hooks/useSesion.js";

const LoginForm = () => {
  const { iniciarLogin, registrarUsuario, cargando } = useSesion();

  const [modoRegistro, setModoRegistro] = useState(true);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const navegar = useNavigate();

  // Estado inicial del formulario
  const estadoInicial = { email: "", password: "", displayName: "" };
  const [form, setForm] = useState(estadoInicial);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const submitFormulario = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: "", texto: "" }); // Limpiar mensajes previos.
    try {
      if (modoRegistro) {
        await registrarUsuario(form.email, form.password, form.displayName);
        setMensaje({
          tipo: "success",
          texto: "¡Cuenta creada! Revisa tu correo.",
        });
        setForm(estadoInicial);

        // Cierra mensaje después de 2 segundos
        setTimeout(() => {
          setMensaje({ tipo: "", texto: "" });
          navegar("/");
        }, 2000);
      } else {
        await iniciarLogin(form.email, form.password);

        setMensaje({ tipo: "success", texto: "¡Has iniciado sesión!" });
        setForm(estadoInicial);
        setTimeout(() => {
          setMensaje({ tipo: "", texto: "" });
          navegar("/");
        }, 2000);
      }
    } catch (err) {
      if (err.message === "User already registered") {
        setMensaje({
          tipo: "info",
          texto: "Este correo ya está registrado. Inicia sesión.",
        });
        // Cierra mensaje después de 2 segundos

        setModoRegistro(false);
        setForm({ email: form.email, password: "", displayName: "" });
        setTimeout(() => setMensaje({ tipo: "", texto: "" }), 3000);
        return;
      }

      // Si Supabase devuelve "Invalid login credentials", lo traducimos
      if (err.message === "Invalid login credentials") {
        setMensaje({
          tipo: "error",
          texto: "El correo o la contraseña no son correctos.",
        });

        setForm(estadoInicial);
        // Cierra mensaje después de 2 segundos
        setTimeout(() => setMensaje({ tipo: "", texto: "" }), 2000);
      } else {
        setMensaje({
          tipo: "error",
          texto: "Hubo un problema al conectar con el servidor.",
        });
        // Cierra mensaje después de 2 segundos
        setTimeout(() => setMensaje({ tipo: "", texto: "" }), 2000);
      }
    }
  };
  return (
    <form className="form-login-registro" onSubmit={submitFormulario}>
      <h2>{modoRegistro ? "Crea tu cuenta" : "Inicia sesión"}</h2>

      <Mensaje tipo={mensaje.tipo} texto={mensaje.texto} />
      <Mensaje tipo="info" texto="Mensaje de prueba" />
      <div className="campo-formulario">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="campo-formulario">
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* Solo mostramos el nombre si estamos registrando */}
      {modoRegistro && (
        <div className="campo-formulario">
          <label>Nombre (solo para registro)</label>
          <input
            type="text"
            name="displayName"
            value={form.displayName}
            onChange={handleChange}
          />
        </div>
      )}
      <div className="botones">
        <button type="submit" disabled={cargando}>
          {modoRegistro ? "Registrarme" : "Iniciar Sesión"}
        </button>

        <button
          type="button"
          className="boton-alternativo"
          disabled={cargando}
          onClick={() => {
            setModoRegistro(!modoRegistro); //Solo cambia modo.
            setForm(estadoInicial); //Se limpia si cambias de registo a login.
            setMensaje("");
          }}
        >
          {modoRegistro ? (
            <>
              <span className="cuenta">¿Ya tienes cuenta?</span> Entra aquí
            </>
          ) : (
            <>
              <span className="cuenta">¿No tienes cuenta?</span> Regístrate
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
