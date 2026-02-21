import { useEffect, useState } from "react";
import { supabaseConexion } from "../supabase/supabase";
import useContextoSesion from "../hooks/useContextoSesion.js";
import Cargando from "../components/Cargando";
import "./AdminPages.css";

const AdminRoles = () => {
  const { usuario, rol } = useContextoSesion();

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const esAdmin = rol === "administrador";

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      try {
        // 1. Si no es admin → no cargar nada
        if (!esAdmin) {
          return;
        }

        // 2. Cargar todos los usuarios
        const { data, error } = await supabaseConexion
          .from("roles")
          .select("id_rol, email, rol")
          .order("email", { ascending: true });

        if (error) throw error;

        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [esAdmin]);

  // Cambiar rol
  const cambiarRol = async (id_rol, nuevoRol) => {
    try {
      const { error } = await supabaseConexion
        .from("roles")
        .update({ rol: nuevoRol })
        .eq("id_rol", id_rol);

      if (error) throw error;

      setUsuarios((prev) =>
        prev.map((u) => (u.id_rol === id_rol ? { ...u, rol: nuevoRol } : u))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Render
  if (cargando) return <Cargando />;
  if (error) return <p>Error: {error}</p>;
  if (!esAdmin) return <p>No tienes permisos para ver esta página.</p>;

  return (
    <div className="admin-container">
      <h2 className="admin-titulo">Administración de Roles</h2>
      {usuarios
        .filter((u) => u.id_rol !== usuario?.id)
        .map((u) => (
          <div key={u.id_rol} className="admin-card">
            <div>
              <p className="admin-email">{u.email}</p>
              <p className="admin-rol">Rol actual: {u.rol}</p>
            </div>
            <div className="admin-select-container">
              <select
                className="admin-select"
                value={u.rol}
                onChange={(e) => cambiarRol(u.id_rol, e.target.value)}
              >
                <option value="usuario">usuario</option>
                <option value="administrador">administrador</option>
              </select>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AdminRoles;
