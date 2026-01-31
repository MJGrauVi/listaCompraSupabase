import "./Mensaje.css";
//Este componente solo depende del formulario por lo que no hace falta usar contexto.
const Mensaje = ({ tipo = "", texto="" }) => {

  if (!texto) return null;

  return (
    <div className={`mensaje ${tipo}`}>
      <span>{texto}</span>
    </div>
  );
};

export default Mensaje;
