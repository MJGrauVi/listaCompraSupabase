import React from 'react'
import "./ProductoInfo.css";
import ProductoDetalle from "./Productodetalle.jsx";
import  useProductos  from "../hooks/useProductos.js";

const ProductoInfo = ({ producto}) => {

    //Leer del contexto.
    const {productoExpandido, toggleProducto }= useProductos();

    const expandido = productoExpandido === producto.id;

    return (
        <div className="producto-info" onClick={() => toggleProducto(producto.id)}>
            <h3>{producto.nombre}</h3>
            <p>{producto.precio} - {producto.precio}</p>
            {expandido && <ProductoDetalle producto={producto} />}
        </div>
    )
}

export default ProductoInfo;