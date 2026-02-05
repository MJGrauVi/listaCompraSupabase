import React from "react";
import "./Producto.css";
import ProductoPP from "./ProductoPP.jsx";
import ProductoInfo from "./ProductoInfo.jsx";
import useSesion from "../hooks/useSesion.js";
import ProductoAcciones from "./ProductoAcciones.jsx";

const Producto = ({ producto }) => {
  const { usuario } = useSesion();

  return (
    <div className={usuario ? "producto-item-usuario" : "producto-item"}>

      <div className="producto-imagen-usuario">
        {producto.imagen_url ? (
          <img src={producto.imagen_url} alt={producto.nombre} />
        ) : (
          <div className="sin-imagen">Sin imagen</div>
        )}
      </div>

      <ProductoInfo producto={producto} />

      <div className="producto-pp2">
        <ProductoPP producto={producto} />
        {usuario && <ProductoAcciones producto={producto} />}
      </div>
    </div>
  );
};

export default Producto;
