import React, { useState, useEffect } from "react";
import "./ListadoProductos.css";
import Producto from "../Producto.jsx";
import Cargando from "../Cargando.jsx";
import FiltroProductos from "../FiltroProductos.jsx";
import useProductos from "../../hooks/useProductos.js";
import useSesion from "../../hooks/useSesion.js";

const ListadoProductos = () => {
  const {
    productos,
    cargando,
    borrarProducto,
    productoExpandido,
    toggleProducto,
  } = useProductos();
  console.log("ListadoProductos.jsx:" ,productos);
  const {usuario} = useSesion();
  //Estados.

  const [textoFiltro, setTextoFiltro] = useState("");
  const [mensajeEliminado, setMensajeEliminado] = useState("");

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

  const handleBorrarProducto = async (id) => {
    //LLamamos a borrarProducto del hook con el id del producto a eliminar. Informamos al usuario.
    const productoAEliminar = productos.find(
      (d) => String(d.id) === String(id),
    );
    try {
      await borrarProducto(id);
      setMensajeEliminado(`Producto "${productoAEliminar?.nombre}" eliminado.`);
    } catch {
      console.log("Error al borrar producto");
      setMensajeEliminado("Error al eliminar el producto.");
    }
  };
  //Eliminamos el mensaje a los segundos que indica el timer.
  useEffect(() => {
    if (mensajeEliminado) {
      const timer = setTimeout(() => setMensajeEliminado(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [mensajeEliminado]);

  if (cargando) return <Cargando />;

  return (
    <div className="contenedor-listado-productos">
      <h2>Listado de Productos</h2>

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
            expandido={productoExpandido === producto.id}
            onToggle={() => toggleProducto(producto.id)}
            onBorrar={() => handleBorrarProducto(producto.id)}
          />
        ))}
      </div>

      {mensajeEliminado && (
        <div
          className={`mensaje-eliminado ${!mensajeEliminado ? "oculto" : ""}`}
        >
          {mensajeEliminado}
        </div>
      )}
      {/* Muestra mensaje al clicar en Borrar. */}
    </div>
  );
};

export default ListadoProductos;
