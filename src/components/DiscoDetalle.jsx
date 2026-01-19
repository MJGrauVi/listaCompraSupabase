import React from "react";

const DiscoDetalle = ({ disco }) => {
  return (
    //Muesta el detalle al clicar sobre el disco.
    <div className="disco-detalle">
      <p>Año: {disco.lanzamiento}</p>
      <p>Localización: {disco.localizacion}</p>
      <p>Prestado: {disco.prestado ? "Sí" : "No"}</p>
      {/* Aquí puedes añadir más detalles si los hubiera */}
    </div>
  );
};

export default DiscoDetalle;
