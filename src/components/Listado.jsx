import React from "react";
import { useState } from "react";
import "./Listado.css";
import useProductos from "../hooks/useProductos.js";
import useSesion from "../hooks/useSesion.js";
import Producto from "./Producto.jsx";
import Cargando from "./Cargando.jsx";
import FiltroProductos from "./FiltroProductos.jsx";
import {calcularResumenProductos} from "../biblioteca/funciones.js";

const Listado = () => {
  const { usuario } = useSesion();
  const { productos, cargando } = useProductos();

  console.log("Listado usuario: ", usuario);

  const [textoFiltro, setTextoFiltro] = useState("");

  // Filtrado de productos.
  const productosFiltrados = productos.filter((p) => {
    if (!textoFiltro.trim()) return true;
    const texto = textoFiltro.toLowerCase();
    return (
      p.nombre?.toLowerCase().includes(texto) ||
      (p.peso != null && String(p.peso).includes(texto)) ||
      (p.precio != null && String(p.precio).includes(texto))
    );
  });
  //Guardamos el texto introducido en el input de filtrado, por el cual buscamos productos.
  const manejarCambioFiltro = (e) => {
    setTextoFiltro(e.target.value);
  };

  const limpiarFiltro = () => {
    setTextoFiltro("");
  };
const { cantidad, precioMedio } =
  calcularResumenProductos(productosFiltrados);
  if (cargando) return <Cargando />;
  return (
    <div className="contenedor-listado-productos">
      <h2>Listado de productos</h2>

      {/* Sección de filtrado. */}
      {usuario && (
        <>
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
      </>
      )}
      <div className="lista-productos">
        {productosFiltrados.map((producto) => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
      {usuario && (
      <div className="productos-resumen">
        <h3>Resumen del listado</h3>
        <p>
          <strong>Número de productos:</strong> {cantidad}
        </p>
        <p>
          <strong>Precio medio:</strong> {precioMedio} €
        </p>
      </div>
      )}
    </div>
  );
};

export default Listado;
