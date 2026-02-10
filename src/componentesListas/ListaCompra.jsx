// componentesListas/VerListaCompra.jsx
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useListasCompra from "../hooks/useContextoListasCompra.js";

const ListaCompra = ({ listaCompra }) => {
  const { borrarVerListaCompra } = useListasCompra();

  const handleEliminar = () => {
    if (confirm("¿Seguro que quieres eliminar esta listaCompra?")) {
      borrarVerListaCompra(listaCompra.id);
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <span>🛒 {listaCompra.nombre_lista}</span>
        </Card.Title>

        <Card.Subtitle className="text-muted mb-3">
          Propietario: {listaCompra.propietario_id}
        </Card.Subtitle>

        <div className="d-flex gap-2">
          <Link to={`/listasCompra/${listaCompra.id}`} className="btn btn-primary btn-sm">
            Ver
          </Link>

          <Link
            to={`/listasCompra/${listaCompra.id}/editar`}
            className="btn btn-warning btn-sm"
          >
            Editar
          </Link>

          <Button variant="danger" size="sm" onClick={handleEliminar}>
            Eliminar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ListaCompra;
