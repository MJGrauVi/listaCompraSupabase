import React from "react";
import "./ProductoSiUsuario.css";
import ProductoPP from "./ProductoPP.jsx";
import ProductoInfo from "./ProductoInfo.jsx";
import useSesion from "../hooks/useSesion.js";
import ProductoAcciones from "./ProductoAcciones.jsx";

const Producto = ({ producto }) => {
  //Leer del contexto.
  const { usuario } = useSesion();
  return (
    <>
      {/* Render si tenemos usuario. */}
{/*       {usuario && (
        <div className="producto-item-usuario">
          <div className="producto-imagen-usuario">
            {producto.imagen_url ? (
              <img src={producto.imagen_url} alt={producto.nombre} />
            ) : (
              <div className="sin-imagen">Sin imagen</div>
            )}
            <ProductoInfo producto={producto} />
          </div>

          <div className="producto-pp2-usuario">
            <ProductoPP producto={producto} /> && <ProductoAcciones />
          </div>
        </div>
      )} */}
       {/* Render público */}
       {!usuario &&
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
      </div>}
    </>
  );
};

export default Producto;
