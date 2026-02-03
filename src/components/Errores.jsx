import "./Errores.css";
//Este componente solo depende del formulario por lo que no hace falta usar contexto.
const Errores = ({ erroresMostrar }) => {

  if (!Array.isArray(erroresMostrar) || erroresMostrar.length === 0) {
    return null;
  }

  return (
    <>
      <h2>Control de errores</h2>
      <div className="errores">
        {erroresMostrar.map((error, index) => (
          <h4 key={index}>{error}</h4>
        ))}
      </div>
    </>
  );
};

export default Errores;
