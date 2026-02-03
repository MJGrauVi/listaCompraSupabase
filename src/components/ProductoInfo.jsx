import React from 'react'
import "./ProductoInfo.css";

const ProductoInfo = ({ producto}) => {

    return (
        <div className="producto-info">
            <h3>{producto.nombre}</h3>
            <div className="producto-descripcion"> {producto.descripcion} </div>
            
        </div>
    )
}

export default ProductoInfo;