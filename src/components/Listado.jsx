import React from "react";
import { useState } from "react";
import "./Listado.css";
import useProductos from "../hooks/useProductos";
import Producto from "./Producto.jsx";
import Cargando from "./Cargando.jsx";
import FiltroProductos from "./FiltroProductos.jsx";

const Listado = () => {
  const { productos, cargando } = useProductos();
  console.log(productos);
  const [textoFiltro, setTextoFiltro] = useState("");

  // Filtrado de productos.
  const productosFiltrados = productos.filter((d) => {
    if (!textoFiltro.trim()) return true;
    const texto = textoFiltro.toLowerCase();
    return (
      d.nombre?.toLowerCase().includes(texto) ||
      d.peso?.toLowerCase().includes(texto) ||
      d.precio?.toLowerCase().includes(texto)
    );
  });
  //Guardamos el texto introducido en el input de filtrado, por el cual buscamos productos.
  const manejarCambioFiltro = (e) => {
    setTextoFiltro(e.target.value);
  };

  const limpiarFiltro = () => {
    setTextoFiltro("");
  };

  if (cargando) return <Cargando />;
  return (
    <div>
      <h2>Listado de productos</h2>

      {/* Sección de filtrado. */}
      <FiltroProductos
        textoFiltro={textoFiltro}
        onChange={manejarCambioFiltro}
        onLimpiar={limpiarFiltro}
      />
      {/* Mensaje del filtrado */}
      <p>
        Mostrando {productosFiltrados.length} de {productos.length} productos
        {textoFiltro.trim() && ` (filtrados por "${textoFiltro}")`}
      </p>
      <div className="lista-productos">
        {productosFiltrados.map((producto) => (
          <Producto
            key={producto.id}
            producto={producto}
         
          />
        ))}
      </div>
    </div>
  );
};

export default Listado;
