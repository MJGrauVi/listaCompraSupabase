import React from "react";
import "./Producto.css";
import ProductoPP from "./ProductoPP.jsx";
import ProductoInfo from "./ProductoInfo.jsx";
import useContextoSesion from "../hooks/useContextoSesion.js";
import ProductoAcciones from "./ProductoAcciones.jsx";

const Producto = ({ producto, onProductoEliminado }) => {
  //Leer del contexto.
  const { usuario } = useContextoSesion();

   
  return (
    <>
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
      {usuario && <ProductoAcciones producto={producto} onProductoEliminado={onProductoEliminado} />}
    </>
  );
};

export default Producto;
