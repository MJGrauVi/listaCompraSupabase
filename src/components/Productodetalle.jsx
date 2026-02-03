import React from "react";

const ProductoDetalle = ({ producto }) => {
  return (
    //Muesta el detalle al clicar sobre el producto.
    <div className="producto-detalle">
      <p>Año: {producto.lanzamiento}</p>
      <p>Localización: {producto.localizacion}</p>
      <p>Prestado: {producto.prestado ? "Sí" : "No"}</p>
      {/* Aquí puedes añadir más detalles si los hubiera */}
    </div>
  );
};

export default ProductoDetalle;
