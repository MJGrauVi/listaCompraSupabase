import React from "react";
import useProductos from "../context/ProveedorProductos.jsx";

const Listado = () => {
  const { productos, cargando } = useProductos();
  if (cargando) return <p>Cargando productos...</p>;
  return (
    <div>
      <h2>Listado de productos</h2>
      <ul>
        {" "}
        {productos.map((p) => (
          <li key={p.id}>
            {" "}
            <strong>{p.nombre}</strong> — {p.precio} €{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listado;
