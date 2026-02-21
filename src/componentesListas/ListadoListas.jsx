import { Link } from "react-router-dom";
import useContextoListasCompra from "../hooks/useContextoListasCompra.js";
import "./ListadoListas.css";
import useContextoSesion from "../hooks/useContextoSesion.js";

const ListadoListas = () => {
  const { listasCompra, cargando } = useContextoListasCompra();
  const { usuario, rol } = useContextoSesion();

  const esAdmin = rol === "administrador";

  if (cargando) return <p className="listas-loading">Cargando listas...</p>;

  return (
    <div className="listas-container">
      <h2>Mis listas de compra</h2>

      {listasCompra.length === 0 && (
        <p className="listas-vacio">No hay listas creadas.</p>
      )}

      {listasCompra.map((lista) => (
        <div key={lista.id} className="lista-card">
          <h5 className="lista-nombre">{lista.nombre_lista}</h5>

          <div className="lista-acciones">
            {!esAdmin && (
              <Link to={`/listasCompra/${lista.id}`} className="btn btn-ver">
                Añadir producto
              </Link>
            )}

            <Link
              to={`/listasCompra/${lista.id}/detalle`}
              className="btn btn-detalle"
            >
              Ver detalle
            </Link>

            {!esAdmin && (
              <Link
                to={`/listasCompra/${lista.id}/eliminar`}
                className="btn btn-eliminar"
              >
                Eliminar Lista
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListadoListas;
