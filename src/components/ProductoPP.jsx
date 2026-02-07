import React from "react";
import "./ProductoPP.css";

const ProductoPP = ({ producto }) => {
  return (
    <div className="producto-pp">
      <table className="tabla-producto">
        <thead>
          <tr>
            <th>Peso</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{producto.peso.toLocaleString("es-ES")} gr.</td>
            <td>{producto.precio.toLocaleString("es-ES", {style: "currency", currency: "EUR"})}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductoPP;
