import React from 'react'
import "./DiscoInfo.css";
import DiscoDetalle from "./DiscoDetalle.jsx";
import  useDiscos  from "../hooks/useDiscos.js";

const DiscoInfo = ({ disco}) => {

    //Leer del contexto.
    const {discoExpandido, toggleDisco }= useDiscos();

    const expandido = discoExpandido === disco.id;

    return (
        <div className="disco-info" onClick={() => toggleDisco(disco.id)}>
            <h3>{disco.nombreDisco}</h3>
            <p>{disco.grupo} - {disco.genero}</p>
            {expandido && <DiscoDetalle disco={disco} />}
        </div>
    )
}

export default DiscoInfo;