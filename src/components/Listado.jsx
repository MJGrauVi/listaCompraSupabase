import React, { useState } from "react";
import "./Listado.css";
import useProductos from "../hooks/useProductos.js";
import useSesion from "../hooks/useSesion.js";
import Producto from "./Producto.jsx";
import Cargando from "./Cargando.jsx";
import FiltroProductos from "./FiltroProductos.jsx";
import { calcularResumenProductos } from "../biblioteca/funciones.js";


const Listado = () => {
  const { usuario } = useSesion();
  const { productos, cargando, setOrden,  } = useProductos();

  const [textoFiltro, setTextoFiltro] = useState("");


  // Filtrado de productos.
  let productosFiltrados = productos.filter((p) => {
    if (!textoFiltro.trim()) return true;
    const texto = textoFiltro.toLowerCase();
    return (
      p.nombre?.toLowerCase().includes(texto) ||
      String(p.peso).includes(texto) ||
      String(p.precio).includes(texto)
    );
  });

  // Resumen.
  const { cantidad, precioMedio } =
    calcularResumenProductos(productosFiltrados);

  const manejarCambioFiltro = (e) => setTextoFiltro(e.target.value);
  const limpiarFiltro = () => setTextoFiltro("");

  if (cargando) return <Cargando />;
  return (
    <>
  {/*   if (cargando) return <Cargando /> */}
    <div className="contenedor-listado-productos">
      <h2>Listado de productos</h2>

      {/* FILTRADO SOLO SI HAY USUARIO */}
      {usuario && (
        <>
          <FiltroProductos
            textoFiltro={textoFiltro}
            onChange={manejarCambioFiltro}
            onLimpiar={limpiarFiltro}
          />
        </>
      )}
      {/* ORDENACIÓN SOLO SI HAY USUARIO */}
      {usuario && (
        <div className="ordenar">
          <label>Ordenar por: </label>
          <select onChange={(e) => setOrden(e.target.value || null)}>
            <option value="">Sin orden</option>
            <option value="nombre">Nombre</option>
            <option value="peso">Peso</option>
            <option value="precio">Precio</option>
          </select>
        </div>
      )}

      {usuario && (
        <>
          <p>
            Mostrando {productosFiltrados.length} de {productos.length}{" "}
            productos
            {textoFiltro.trim() && ` (filtrados por "${textoFiltro}")`}
          </p>
        </>
      )}

      {/* LISTA DE PRODUCTOS */}
      <div className="lista-productos">
        {productosFiltrados.map((producto) => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>

      {/* RESUMEN SOLO SI HAY USUARIO */}
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
    </>
  );
};

export default Listado;
