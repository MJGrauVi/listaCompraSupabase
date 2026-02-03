import React from 'react'
import "./ProductoPesoPrecio.css";
import ProductoDetalle from "./Productodetalle.jsx";
import  useProductos  from "../hooks/useProductos.js";

const ProductoPesoPrecio = ({ producto}) => {

    //Leer del contexto.
    const {productoExpandido, toggleProducto }= useProductos();

    const expandido = productoExpandido === producto.id;

    return (
        <div className="producto-info" onClick={() => toggleProducto(producto.id)}>
            <h3>{producto.nombre}</h3>
            <p> {producto.peso} gr - {producto.precio.toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR"
        })}</p>
            {expandido && <ProductoDetalle producto={producto} />}
        </div>
    )
}

export default ProductoPesoPrecio;