import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import useListasCompra from "../hooks/useContextoListasCompra.js";

const VerListaCompra = () => {
  const { id } = useParams();
  const { obtenerListaCompraPorId, cargando } = useListasCompra();

  const [lista, setLista] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const datos = await obtenerListaCompraPorId(id);
      setLista(datos);
    };
    cargar();
  }, [id]);

  if (cargando || !lista) {
    return <p className="mt-3">Cargando lista...</p>;
  }

  return (
    <div className="container mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3">
            🛒 {lista.nombre_lista}
          </Card.Title>

          <Card.Subtitle className="text-muted mb-4">
            Propietario: {lista.propietario_id}
          </Card.Subtitle>

          <div className="d-flex gap-2">
            <Link
              to={`/listasCompra/${lista.id}/editar`}
              className="btn btn-warning"
            >
              Editar
            </Link>

            <Link to="/listasCompra" className="btn btn-secondary">
              Volver
            </Link>
          </div>
        </Card.Body>
      </Card>

      {/* Aquí podrás añadir productos asociados a la lista */}
      <div className="mt-4">
        <h4>Productos de esta lista</h4>
        <p>(Aquí puedes mostrar productos asociados si los tienes en tu BD)</p>
      </div>
    </div>
  );
};

export default VerListaCompra;
