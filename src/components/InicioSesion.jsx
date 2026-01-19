import React from "react";
import { useNavigate } from "react-router-dom";

const InicioSesion = () => {
  const navigate = useNavigate();


  return (
    <div className="inicio-sesion" >
      <button
        className="btn-inicioSesion"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/`);
        }}
      >
        Inicio Sesion
      </button>
     
    </div>
  );
};

export default InicioSesion;
