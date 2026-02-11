import "./Mensaje.css";
//Este componente solo depende del formulario por lo que no hace falta usar contexto.
const Mensaje = ({ tipo = "", texto="" }) => {

  if (!texto) return null;//Si es null, undifined, false o "", no renderiza nada.

  return (
    <div className={`mensaje ${tipo}`}>
      <span>{texto}</span>
    </div>
  );
};

export default Mensaje;
