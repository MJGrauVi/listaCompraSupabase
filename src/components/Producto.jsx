import React from "react";
import "./Producto.css";
import ProductoAcciones from "./ProductoAcciones.jsx";
import ProductoInfo from "./ProductoInfo.jsx";

const Producto = ({ producto, onBorrar }) => {
  //Leer del contexto.

  return (
    <div className="producto-item">
      <div className="producto-imagen">
        {producto.url_caratula ? (
          <img src={producto.url_caratula} alt={producto.nombreProducto} />
        ) : (
          <div className="sin-imagen">Sin imagen</div>
        )}
      </div>
      <ProductoInfo producto={producto} />
      <div className="producto-acciones">
        <ProductoAcciones producto={producto} onBorrar={onBorrar} />
      </div>
    </div>
  );
};

export default Producto;
