import React from "react";
import { useNavigate } from "react-router-dom";
import useContextoProductos from "../hooks/useContextoProductos.js";
import "./ProductoAcciones.css";


const ProductoAcciones = ({ producto, onProductoEliminado}) => {
  const navigate = useNavigate();
  const { borrarProducto} = useContextoProductos();

  if(!producto) return null;
  return (
    <div className="producto-acciones">
      <button
        className="btn-editar"
        onClick={(e) => {
          e.stopPropagation();
          if(!producto) return;
          navigate(`/productos/${producto.id}/editar`);
        }}
      >
        Editar
      </button>
      <button onClick={e => { 
        e.stopPropagation(); 
        borrarProducto(producto.id);
        onProductoEliminado?.(producto.nombre);
        }}
        >
        Borrar
      </button>
    
    </div>
  );
};

export default ProductoAcciones;
