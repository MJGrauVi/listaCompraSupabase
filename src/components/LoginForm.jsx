import React from "react";
import { useState} from "react";
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

  //Funcion que sirve para tomar el valor de todos los inputs, copia el estado anterior y actualiza ese campo.
  //hace falta el name, sino da undefined.
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,//
    });
  };
  
  const mostrarMensaje = (tipo, texto, tiempo = 2000) => {
    setMensaje({ tipo, texto });

    setTimeout(() => {
      setMensaje({ tipo: "", texto: "" });
    }, tiempo);
  };
  const submitFormulario = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: "", texto: "" }); // Limpiar mensajes previos.

    try {
      if (modoRegistro) {
        await registrarUsuario(form.email, form.password, form.displayName);

        mostrarMensaje("success", "¡Cuenta creada! Revisa tu correo.", 2500);
        setForm(estadoInicial);

        setTimeout(() => {
          navegar("/");
        }, 2500);
      } else {
        await iniciarLogin(form.email, form.password);

        mostrarMensaje("success", "¡Has iniciado sesión!", 2000);
        setForm(estadoInicial); //Limpio formulario.
        
         setTimeout(() => navegar("/"), 2000);
      }
    } catch (err) {
      if (err.message === "User already registered") {
        mostrarMensaje(
          "info",
          "Este correo ya está registrado. Inicia sesión.",
          3000,
        );
        // Cierra mensaje después de 2 segundos
        setModoRegistro(false);
        setForm({ email: form.email, password: "", displayName: "" });

        return;
      }

      // Si Supabase devuelve "Invalid login credentials", lo traducimos
      if (err.message === "Invalid login credentials") {

        mostrarMensaje("error", "El correo o la contraseña no son correctos.");
        setForm(estadoInicial);
      
      } else {
     mostrarMensaje("error", "Hubo un problema al conectar con el servidor.");
       
      }
    }
  };

  /* if (cargando) return <Cargando />; */

  return (
    <form className="form-login-registro" onSubmit={submitFormulario}>
      <h2>{modoRegistro ? "Crea tu cuenta" : "Inicia sesión"}</h2>

    
      <Mensaje tipo={mensaje.tipo} texto={mensaje.texto} />
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
