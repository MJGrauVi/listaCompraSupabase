import useSesion from "../hooks/useSesion.js";
import { Link } from "react-router-dom";

 
const BotonSesion = () => {
  const { usuario, logout} = useSesion();

  return (
    <div className="inicio-sesion">
      {usuario ? (
        <>
          <span>
            Hola {usuario.user_metadata.display_name}
          </span>
          <Link to="/">
          <button className="btn-logout" onClick={logout}>
            Cerrar sesión
          </button>
          </Link>
        </>
      ) : (
        <Link to="/login">
          <button className="btn-inicio">
            Iniciar sesión
          </button>
        </Link>
      )}
    </div>
  );
};

export default BotonSesion;
