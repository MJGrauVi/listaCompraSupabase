import { Navigate } from "react-router-dom";
import useContextoSesion from "../hooks/useContextoSesion";
import { useEffect, useState } from "react";

const RutaAdmin = ({ children }) => {
  const { usuario, obtenerRolUsuario } = useContextoSesion();
  const [rol, setRol] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      if (!usuario) {
        setCargando(false);
        return;
      }

      const r = await obtenerRolUsuario();
      setRol(r);
      setCargando(false);
    };

    cargar();
  }, [usuario]);

  if (cargando) return <p>Cargando...</p>;

  if (!usuario || rol !== "administrador") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaAdmin;
