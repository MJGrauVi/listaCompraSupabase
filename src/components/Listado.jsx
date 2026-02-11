import React, { useState, useEffect } from "react";
import "./Listado.css";
import useContextoProductos from "../hooks/useContextoProductos.js";
import useContextoSesion from "../hooks/useContextoSesion.js";
import Producto from "./Producto.jsx";
import Cargando from "./Cargando.jsx";
import FiltroProductos from "./FiltroProductos.jsx";
import ResumenProductos from "./ResumenProductos.jsx";
import { calcularResumenProductos } from "../biblioteca/funciones.js";

const Listado = ({ onProductoSeleccionado }) => {
  const { usuario } = useContextoSesion();
  const { productos, cargando, setOrden } = useContextoProductos();

  const [textoFiltro, setTextoFiltro] = useState("");
  const [mensajeEliminado, setMensajeEliminado] = useState("");

  let productosFiltrados = productos.filter((p) => {
    if (!textoFiltro.trim()) return true;
    const texto = textoFiltro.toLowerCase();
    return (
      p.nombre?.toLowerCase().includes(texto) ||
      String(p.peso).includes(texto) ||
      String(p.precio).includes(texto)
    );
  });

  const manejarCambioFiltro = (e) => setTextoFiltro(e.target.value);
  const limpiarFiltro = () => setTextoFiltro("");

  const { cantidad, precioMedio } = calcularResumenProductos(productosFiltrados);

  useEffect(() => {
    if (!mensajeEliminado) return;
    const timer = setTimeout(() => setMensajeEliminado(""), 3000);
    return () => clearTimeout(timer);
  }, [mensajeEliminado]);

  if (cargando) return <Cargando />;

  return (
    <>
      <div className="contenedor-listado-productos">
        <h2>Listado de productos</h2>
     {/*  <Listado onProductoSeleccionado={onProductoSeleccionado} /> */}
        {usuario && (
          <div className="seccion-filto">
            <FiltroProductos
              textoFiltro={textoFiltro}
              onChange={manejarCambioFiltro}
              onLimpiar={limpiarFiltro}
            />
          </div>
        )}

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
          <p>
            Mostrando {productosFiltrados.length} de {productos.length} productos
            {textoFiltro.trim() && ` (filtrados por "${textoFiltro}")`}
          </p>
        )}

        <div className="lista-productos">
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className="producto-contenedor">
              <Producto
                producto={producto}
                onProductoEliminado={(nombre) =>
                  setMensajeEliminado(`Producto "${nombre}" eliminado correctamente`)
                }
                onProductoSeleccionado={onProductoSeleccionado}
              />

            </div>
          ))}
        </div>

        {usuario && (
          <ResumenProductos
            cantidad={cantidad}
            precioMedio={precioMedio}
          />
        )}

        {mensajeEliminado && (
          <div className="mensaje-eliminado">{mensajeEliminado}</div>
        )}
      </div>
    </>
  );
};

export default Listado;
