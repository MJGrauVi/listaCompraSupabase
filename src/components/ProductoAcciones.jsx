import React from "react";
import { useNavigate } from "react-router-dom";

const ProductoAcciones = ({ producto, onBorrar }) => {
  const navigate = useNavigate();

 /*  const manejarClic = (e) => {
    // Comprobamos si el clic vino del botón Borrar,
    if (e.target.closest(".btn-borrar")) {
      e.stopPropagation(); // evitamos que suba al padre
      onBorrar();
    }
  }; */
  return (
    <div className="producto-acciones" /* onClick={manejarClic} */>
      <button
        className="btn-editar"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/productos/${producto.id}/editar`);
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

export default ProductoAcciones;
