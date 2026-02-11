import React from "react";
import "./ProductoPP.css";
import { formatoSegunTipo } from "../biblioteca/funciones.js";

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
            <td>{formatoSegunTipo(producto.peso, "peso")}</td>
            <td>{formatoSegunTipo(producto.precio, "precio")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductoPP;
