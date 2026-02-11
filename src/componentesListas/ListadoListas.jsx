import { Link } from "react-router-dom";
import useContextoListasCompra from "../hooks/useContextoListasCompra.js";
import "./ListadoListas.css";

const ListadoListas = () => {
  const { listasCompra, cargando } = useContextoListasCompra();

  if (cargando) return <p className="listas-loading">Cargando listas...</p>;

  return (
    <div className="listas-container">
      <h2 className="listas-titulo">Mis listas de compra</h2>

      {listasCompra.length === 0 && (
        <p className="listas-vacio">No hay listas creadas.</p>
      )}

      {listasCompra.map((lista) => (
        <div key={lista.id} className="lista-card">
          <h5 className="lista-nombre">{lista.nombre_lista}</h5>

          <div className="lista-acciones">
            <Link to={`/listasCompra/${lista.id}`} className="btn btn-ver">
              Añadir producto
            </Link>
            <Link to={`/listasCompra/${lista.id}/detalle`} className="btn btn-detalle"> Ver detalle </Link>
            <Link to={`/listasCompra/${lista.id}/eliminar`} className="btn btn-eliminar">Eliminar Lista</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListadoListas;
