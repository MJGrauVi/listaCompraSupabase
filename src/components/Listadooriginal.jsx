import React, { useState, useEffect } from "react";
import "./Listado.css";
import useContextoProductos from "../hooks/useContextoProductos.js";
import useContextoSesion from "../hooks/useContextoSesion.js";
import Producto from "./Producto.jsx";
import Cargando from "./Cargando.jsx";
import FiltroProductos from "./FiltroProductos.jsx";
import ResumenProductos from "./ResumenProductos.jsx";
import { calcularResumenProductos, formatearPrecio } from "../biblioteca/funciones.js";

//Incorporo funcionalidad m
const Listadooriginal = ({onSelectProducto}) => {
  const { usuario } = useContextoSesion();
  const { productos, cargando, setOrden } = useContextoProductos();

  const [textoFiltro, setTextoFiltro] = useState("");
  const [mensajeEliminado, setMensajeEliminado] = useState("");


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

  const manejarCambioFiltro = (e) => setTextoFiltro(e.target.value);
  const limpiarFiltro = () => setTextoFiltro("");

  // LLamo a la función para mostrar el resumen con el cálculo.
  const { cantidad, precioMedio } =
    calcularResumenProductos(productosFiltrados);

  useEffect(() => {
    if (!mensajeEliminado) return;
    const timer = setTimeout(() => {
      setMensajeEliminado("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [mensajeEliminado]);

  if (cargando) return <Cargando />;

  return (
    <>
      {/*  if (cargando) return <Cargando /> */}
      <div className="contenedor-listado-productos">
        <h2>Listado de productos</h2>

        {/* FILTRADO SOLO SI HAY USUARIO */}
        {usuario && (
          <div className="seccion-filto">
            <FiltroProductos
              textoFiltro={textoFiltro}
              onChange={manejarCambioFiltro}
              onLimpiar={limpiarFiltro}
            />
          </div>
        )}

        {/* Selector para ordenar, solo visible si usuario. */}
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

        {/* Lista de productos. */}
        <div className="lista-productos">
          {productosFiltrados.map((producto) => (
            <Producto
              key={producto.id}
              producto={producto}
              onProductoEliminado={(nombre) =>
                setMensajeEliminado(
                  `Producto "${nombre}" eliminado correctamente`)
              }
            />
           {onSelectProducto && (
      <button className="btn btn-success btn-sm mt-1" onClick={() => onSelectProducto(producto)}
      >
        Añadir a la lista
      </button>
    )}
        </div>

        {/* Resumen solo si hay usuario. */}
        {usuario && (
          <ResumenProductos cantidad={cantidad} precioMedio={formatearPrecio(precioMedio)} />
        )}

        {/* Si mensajeEliminado tiene contenido renderizo el div. */}

          {mensajeEliminado && ( <div className="mensaje-eliminado"> {mensajeEliminado} </div> )}

        {/* Muestra mensaje al clicar en Borrar. */}
      </div>
    </>
  );
};

export default Listadooriginal;
