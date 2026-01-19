import "./Cargando.css";
//Mostramos al usuario en el periodo de carga de los datos.
const Cargando = () => {
  return (
    <div className="contenedor-cargando">
      <div className="spinner"></div>
      <p>Cargando discos...</p>
    </div>
  );
};

export default Cargando;