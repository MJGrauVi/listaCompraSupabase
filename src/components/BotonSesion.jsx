import useContextoSesion from "../hooks/useContextoSesion.js";
import {useNavigate} from "react-router-dom";
import Mensaje from "./Mensaje.jsx";

const BotonSesion = () => {
  const { usuario, cerrarSesion } = useContextoSesion();
  const navigate = useNavigate();

  const handleCerrarSesion = async ()=>{
    await cerrarSesion();
    navigate("/");
  };

  return (
    <div className="inicio-sesion">
      <Mensaje tipo={Mensaje.tipo} texto={Mensaje.texto}/>
      {usuario ? (
        <>
          <span>Hola {usuario.user_metadata.display_name}</span>
            <button className="btn-logout" onClick={handleCerrarSesion}>
              Cerrar sesión
            </button>
        </>
      ) : (
          <button className="btn-inicio" onClick={()=>navigate("/login")}>
            Iniciar sesión / Registrate
            </button>
      )}
    </div>
  );
};

export default BotonSesion;
