import useContextoSesion from "../hooks/useContextoSesion.js";
import useContextoPerfil from "../hooks/useContextoPerfil.js";
import { useNavigate } from "react-router-dom";
import Mensaje from "./Mensaje.jsx";
import "./BotonSesion.css";

const BotonSesion = () => {
  const { usuario, cerrarSesion } = useContextoSesion();
  const { perfil } = useContextoPerfil();
  const navigate = useNavigate();

  const handleCerrarSesion = async () => {
    await cerrarSesion();
    navigate("/");
  };

  const irAlPerfil = () => navigate("/perfil");

  const avatar = perfil?.avatar_url;
  const inicial = usuario?.user_metadata?.display_name?.[0]?.toUpperCase() || "?";

  return (
    <div className="header-session">
      <Mensaje tipo={Mensaje.tipo} texto={Mensaje.texto} />

      {usuario ? (
        <div className="disposicion-avatar">
          <div className="avatar" onClick={irAlPerfil} title="Ver perfil">
            {/* Si hay avatar lo muestra, sino muestra la inicial de display_name */}
            {avatar ? (
              <img src={avatar} alt="avatar" />
            ) : (
              <span className="letra-avatar">{inicial}</span>
            )}
          </div>

          <span className="user-name">
            Hola {usuario.user_metadata.display_name}
          </span>

          <button className="btn-logout" onClick={handleCerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <button className="btn-login" onClick={() => navigate("/login")}>
          Iniciar sesión / Regístrate
        </button>
      )}
    </div>
  );
};

export default BotonSesion;
