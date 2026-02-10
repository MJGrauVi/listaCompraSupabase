import { Link } from "react-router-dom";
import useListasCompra from "../hooks/useContextoListasCompra.js";

const ListadoListas = () => {
  const { listasCompra, cargando } = useListasCompra();

  if (cargando) return <p>Cargando listas...</p>;

  return (
    <div className="container mt-4">
      <h2>Mis listas de compra</h2>

      {listasCompra.length === 0 && <p>No hay listas creadas.</p>}

      {listasCompra.map((lista) => (
        <div key={lista.id} className="card p-3 mb-2 shadow-sm">
          <h5>{lista.nombre_lista}</h5>

          <div className="d-flex gap-2">
            <Link to={`/listasCompra/${lista.id}`} className="btn btn-primary">
              Ver lista
            </Link>

            <Link
              to={`/listasCompra/${lista.id}/editar`}
              className="btn btn-warning"
            >
              Editar
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListadoListas;
