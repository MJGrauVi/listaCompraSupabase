import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useContextoListaProductos from "../hooks/useContextoListaProductos.js";
import Listado from "../components/Listado.jsx";

const VerListaCompra = () => {
  const { id } = useParams();

  const {
    productosLista,
    cargarProductosDeLista,
    agregarProductoALista,
    eliminarProductoDeLista
  } = useContextoListaProductos();

  useEffect(() => {
    cargarProductosDeLista(id);
  }, [id]);

  const onProductoSeleccionado = async (producto) => {
    await agregarProductoALista(id, producto.id, 1);
    cargarProductosDeLista(id);
  };

  const handleEliminar = async (idRelacion) => {
    await eliminarProductoDeLista(idRelacion);
    cargarProductosDeLista(id);
  };

  return (
    <div className="contenedor-detalle-lista">
      <h2>Productos en esta lista</h2>

      <ul>
        {productosLista.map((p) => (
          <li key={p.id} className="d-flex justify-content-between">
            <span>
              Producto ID: {p.producto_id} — Cantidad: {p.cantidad}
            </span>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleEliminar(p.id)}
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <h3>Añadir productos</h3>

      <Listado onProductoSeleccionado={onProductoSeleccionado} />
    </div>
  );
};

export default VerListaCompra;
