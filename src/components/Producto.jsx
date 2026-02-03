import React from "react";
import "./Producto.css";
import ProductoPP from "./ProductoPP.jsx";
import ProductoInfo from "./ProductoInfo.jsx";

const Producto = ({ producto }) => {
  //Leer del contexto.

  return (
    <div className="producto-item">
      <div className="producto-imagen">
        {producto.imagen_url ? (
          <img src={producto.imagen_url} alt={producto.nombre} />
        ) : (
          <div className="sin-imagen">Sin imagen</div>
        )}
      </div>
      <ProductoInfo producto={producto} />
      <div className="producto-pp2">
        <ProductoPP producto={producto} />
      </div>
    </div>
  );
};

export default Producto;
