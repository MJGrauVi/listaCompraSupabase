import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./LoginForm.css";
import useSesion from "../hooks/useSesion.js";

const LoginForm = () => {
  const { datosSesion, actualizarDatos, login, registro, limpiarDatosSesion } = useSesion();
  const [modoRegistro, setModoRegistro] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const navegar = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    setMensaje(""); // Limpiar mensajes previos.

    if (modoRegistro) {
      const { data, error } = await registro();
      if (error) {
        console.log("Datas:",data)
        setMensaje(`Error: ${error.message}`);
      } else {
        setMensaje("¡Cuenta creada!.");
        //Pendiente ver la confirmación con email, no recibo email.
        limpiarDatosSesion();
      
      }
    } else {
      const { error } = await login();
      if (error) {
        setMensaje("Email o contraseña incorrectos.");
      
      }else{
        limpiarDatosSesion();
        navegar("/")
      }
    }
  };
  return (
    <form className="form-login-registro" onSubmit={submitLogin}>
      <h2>{modoRegistro ? "Crea tu cuenta" : "Entra a la lista de la Compra"}</h2>
      {mensaje && <p className="alerta">{mensaje}</p>}
      <div className="campo-formulario">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={datosSesion.email || ""}
          onChange={actualizarDatos}
          required
        />
      </div>
      <div className="campo-formulario">
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          name="password"
          value={datosSesion.password || ""}
          onChange={actualizarDatos}
          required
        />
      </div>

      {/* Solo mostramos el nombre si estamos registrando */}
      {modoRegistro && (
      <div className="campo-formulario">
        <label>Nombre (solo para registro)</label>
        <input
          type="text"
          name="display_name"
          value={datosSesion.display_name || ""}
          onChange={actualizarDatos}
        />
      </div>
       )}
      <div className="botones">
        <button type="submit">
          {modoRegistro ? "Registrarme" : "Iniciar Sesión"}
        </button>
        
        <button 
          type="button" 
          className="boton-alternativo"
          onClick={() => {
            setModoRegistro(!modoRegistro);
            setMensaje("");
          }}
        >
          {modoRegistro ? (
            <>
            <span className="cuenta">¿Ya tienes cuenta?</span> Entra aquí </>) : (  
            <><span className="cuenta">¿No tienes cuenta?</span> Regístrate</>)}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
