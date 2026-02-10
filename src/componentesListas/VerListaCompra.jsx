import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useContextoListaProductos from "../hooks/useContextoListaProductos.js";
import useContextoListasCompra from "../hooks/useContextoListasCompra.js";
import Listado from "../components/Listado.jsx";
import "./VerListaCompra.css";

const VerListaCompra = () => {
  const { id } = useParams();

  const {
    productosLista,
    cargarProductosDeLista,
    agregarProductoALista,
    eliminarProductoDeLista,
    actualizarCantidad,
  } = useContextoListaProductos();
  const {listasCompra} = useContextoListasCompra();

  const [mostrarListado, setMostrarListado] = useState(false);

  useEffect(() => {
    cargarProductosDeLista(id);
  }, [id]);

  const onProductoSeleccionado = async (producto) => {
    const existente = productosLista.find(
      (p) => p.producto_id === producto.id
    );

    if (existente) {
      await actualizarCantidad(existente.id, existente.cantidad + 1);
    } else {
      await agregarProductoALista(id, producto.id, 1);
    }
    cargarProductosDeLista(id);
  };

  const onRestarProducto = async (productoRelacion) => {
    if (productoRelacion.cantidad > 1) {
      await actualizarCantidad(
        productoRelacion.id,
        productoRelacion.cantidad - 1
      );
    } else {
      await eliminarProductoDeLista(productoRelacion.id);
    }
    cargarProductosDeLista(id);
  };

  const listaActual = listasCompra.find((lista)=>String(lista.id) === String(id));
  return (
    <div className="lista-detalle-container">
      <h2 className="lista-detalle-titulo">Productos en lista: <strong>{listaActual?.nombre_lista}</strong></h2>

      <ul className="lista-productos">
        {productosLista.map((p) => (
          <li key={p.id} className="lista-producto-item">
            <span className="producto-nombre">
              Producto ID: {p.producto_id}
              <span className="producto-cantidad"> - Cantidad: <strong>{p.cantidad}</strong></span>
            </span>

            <button
              className="btn btn-restar"
              onClick={() => onRestarProducto(p)}
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      <div className="lista-acciones-extra">
        <button
          className="btn btn-add"
          onClick={() => setMostrarListado(!mostrarListado)}
        >
          {mostrarListado ? "Ocultar productos" : "Añadir productos"}
        </button>

        {mostrarListado && (
          <div className="listado-wrapper">
            <Listado onProductoSeleccionado={onProductoSeleccionado} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VerListaCompra;
