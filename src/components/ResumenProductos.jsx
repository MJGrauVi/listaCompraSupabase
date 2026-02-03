import React from 'react'

const ResumenProductos = ({ productos }) => {
    const total = productos.length;

    const precioMedio = total === 0 ? 0 : (productos.reduce((acc, p) => acc + p.precio, 0 / total).toFixed(2));

    return (
        <div className="resumen">
            <h2>ResumenProductos</h2>
            <p>Número de productos: {total}</p>
            <p>Precio medio: {precioMedio}</p>

        </div>
    );
}

export default ResumenProductos;