import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListaProductos } from "../context/ProveedorListaProductos";
import Listado from "../componentes/Listado";

const DetalleLista = () => {
  const { id } = useParams(); // ID de la lista de compra

  const {
    productosLista,
    cargarProductosDeLista,
    agregarProductoALista,
    eliminarProductoDeLista,
  } = useListaProductos();

  useEffect(() => {
    cargarProductosDeLista(id);
  }, [id]);

  const onProductoSelecionado = async (producto) => {
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

      <Listado onProductoSeleccionado={onProductoSelecionado} />
    </div>
  );
};

export default DetalleLista;
