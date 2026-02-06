import React from "react";
import "./ResumenProductos.css";
const ResumenProductos = ({ cantidad, precioMedio }) => {
    

  return (
    <div className="resumen">
      <h2>ResumenProductos</h2>
      <p><strong>Número de productos: </strong>{cantidad}</p>
      <p><strong>Precio medio:</strong> {precioMedio} €</p>
    </div>
  );
};

export default ResumenProductos;
