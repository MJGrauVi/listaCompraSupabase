import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useListaProductos } from "../context/ProveedorListaProductos";

const DetalleLista = () => {
  const { id } = useParams();
  const {
    productosLista,
    cargarProductosDeLista,
    agregarProductoALista
  } = useListaProductos();

  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    cargarProductosDeLista(id);
  }, [id]);

  const handleAdd = async (e) => {
    e.preventDefault();
    await agregarProductoALista(id, productoId, cantidad);
    cargarProductosDeLista(id);
  };

  return (
    <div>
      <h2>Productos de la lista</h2>

      <form onSubmit={handleAdd}>
        <select value={productoId} onChange={(e) => setProductoId(e.target.value)}>
          <option value="">Selecciona un producto</option>
          {/* aquí mapeas tu catálogo */}
        </select>

        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        <button>Añadir</button>
      </form>

      <ul>
        {productosLista.map((p) => (
          <li key={p.id}>
            Producto {p.producto_id} — Cantidad {p.cantidad}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetalleLista;
