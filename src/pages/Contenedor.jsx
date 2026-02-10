import CrearListasCompra from "../componentesListas/CrearListasCompra.jsx";
import FormularioProducto from "../components/FormularioProducto.jsx";


const Contenedor = () => {
  
  return (
    <div className="contenedor-formulario">
      
      <FormularioProducto />
      <CrearListasCompra />
    </div>
  );
};

export default Contenedor;
