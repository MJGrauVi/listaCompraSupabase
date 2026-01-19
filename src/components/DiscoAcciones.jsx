import React from "react";
import { useNavigate } from "react-router-dom";

const DiscoAcciones = ({ disco, onBorrar }) => {
  const navigate = useNavigate();

 /*  const manejarClic = (e) => {
    // Comprobamos si el clic vino del botón Borrar,
    if (e.target.closest(".btn-borrar")) {
      e.stopPropagation(); // evitamos que suba al padre
      onBorrar();
    }
  }; */
  return (
    <div className="disco-acciones" /* onClick={manejarClic} */>
      <button
        className="btn-editar"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/discos/${disco.id}/editar`);
        }}
      >
        Editar
      </button>
      <button onClick={e => { e.stopPropagation(); onBorrar(); }}>
        Borrar
      </button>
      {/* <button className="btn-borrar">Borrar</button> */}
    </div>
  );
};

export default DiscoAcciones;
