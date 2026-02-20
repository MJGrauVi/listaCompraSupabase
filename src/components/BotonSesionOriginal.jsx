import useContextoSesion from "../hooks/useContextoSesion.js";
import { useNavigate } from "react-router-dom";
import Mensaje from "./Mensaje.jsx";
import useContextoPerfil from "../hooks/useContextoPerfil.js";

const BotonSesionOriginal = () => {
  const { usuario, cerrarSesion } = useContextoSesion();
  const { perfil } = useContextoPerfil();
  const navigate = useNavigate();

  const handleCerrarSesion = async () => {
    await cerrarSesion();
    navigate("/");
  };

  const irAlPerfil = () => {
    navigate("/perfil");
  };

  const avatar = perfil?.avatar_url;
  const inicial = usuario?.user_metadata?.display_name?.[0]?.toUpperCase() || "?";

  return (
    <div className="inicio-sesion flex items-center gap-3">
      <Mensaje tipo={Mensaje.tipo} texto={Mensaje.texto} />

      {usuario ? (
        <>
          {/* Avatar redondo */}
          <div
            onClick={irAlPerfil}
            className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer overflow-hidden flex items-center justify-center"
            title="Ver perfil"
          >
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold">{inicial}</span>
            )}
          </div>

          {/* Nombre */}
          <span className="font-medium">
            Hola {usuario.user_metadata.display_name}
          </span>

          {/* Botón logout */}
          <button className="btn-logout" onClick={handleCerrarSesion}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <button className="btn-inicio" onClick={() => navigate("/login")}>
          Iniciar sesión / Registrate
        </button>
      )}
    </div>
  );
};

export default BotonSesionOriginal;
