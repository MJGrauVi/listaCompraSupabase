// ProductoAcciones.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import useContextoProductos from "../hooks/useContextoProductos.js";
import "./ProductoAcciones.css";

const ProductoAcciones = ({
  producto,
  onProductoEliminado,
  onProductoSeleccionado,
}) => {
  const navigate = useNavigate();
  const { borrarProducto } = useContextoProductos();

  if (!producto) return null;

  const enModoSeleccion = Boolean(onProductoSeleccionado);

  return (
    <div className="producto-acciones">
      {!enModoSeleccion && (
        <>
          <button
            className="btn btn-editar"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/productos/${producto.id}/editar`);
            }}
          >
            Editar
          </button>

          <button
            className="btn btn-borrar"
            onClick={(e) => {
              e.stopPropagation();
              borrarProducto(producto.id);
              onProductoEliminado?.(producto.nombre);
            }}
          >
            Borrar
          </button>
        </>
      )}

      {enModoSeleccion && (
        <button
          className="btn btn-add"
          onClick={(e) => {
            e.stopPropagation();
            onProductoSeleccionado(producto);
          }}
        >
          Añadir a la lista
        </button>
      )}
    </div>
  );
};

export default ProductoAcciones;
