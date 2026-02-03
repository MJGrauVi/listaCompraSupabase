import React from "react";

const ProductoDetalle = ({ producto }) => {
  return (
    //Muesta el detalle al clicar sobre el producto.
    <div className="producto-detalle">
      <p>Nombre: {producto.nombre}</p>
      <p>Peso: {producto.pero}</p>
      <p>Descripción: {producto.descripcion}</p>
      {/* Aquí puedes añadir más detalles si los hubiera */}
    </div>
  );
};

export default ProductoDetalle;
