import React from "react";
import "./Disco.css";
import DiscoAcciones from "./DiscoAcciones.jsx";
import DiscoInfo from "./DiscoInfo.jsx";

const Disco = ({ disco, onBorrar }) => {
  //Leer del contexto.

  return (
    <div className="disco-item">
      <div className="disco-imagen">
        {disco.url_caratula ? (
          <img src={disco.url_caratula} alt={disco.nombreDisco} />
        ) : (
          <div className="sin-imagen">Sin imagen</div>
        )}
      </div>
      <DiscoInfo disco={disco} />
      <div className="disco-acciones">
        <DiscoAcciones disco={disco} onBorrar={onBorrar} />
      </div>
    </div>
  );
};

export default Disco;
