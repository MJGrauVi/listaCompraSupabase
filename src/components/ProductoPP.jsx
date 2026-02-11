import React from "react";
import "./ProductoPP.css";
import { formatearValor } from "../biblioteca/funciones.js";

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
            <td>{formatearValor(producto.peso, "peso")}</td>
            <td>{formatearValor(producto.precio, "precio")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductoPP;
