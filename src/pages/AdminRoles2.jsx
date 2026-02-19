import { useEffect, useState, useContext } from "react";
import { supabaseConexion } from "../supabase/supabase";
import { ContextoSesion } from "../context/ProveedorSesion";
import Cargando from "../components/Cargando";
import "./AdminPages.css";

const AdminRoles2 = () => {
  const { usuario, obtenerRolUsuario } = useContext(ContextoSesion);

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [esAdmin, setEsAdmin] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      try {
        // 1. Si no hay usuario → no es admin
        if (!usuario) {
          setEsAdmin(false);
          return;
        }

        // 2. Obtener rol del usuario actual
        const rol = await obtenerRolUsuario();

        if (rol !== "administrador") {
          setEsAdmin(false);
          return;
        }

        setEsAdmin(true);

        // 3. Cargar todos los usuarios
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
  }, [usuario]);

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

     <div className="listas-container">
      <h2 className="listas-titulo">Administración de Roles</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Rol actual</th>
            <th>Cambiar rol</th>
          </tr>
        </thead>
        <tbody> 
          {/* Muestro todos los usuarios distintos del actual, para que no se pueda cambiar el rol a si mismo. */}
          {usuarios.filter((u)=>u.id_rol !== usuario.id)
          .map((u) => (
            <tr key={u.id_rol} className="lista-card">
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>
                <select
                  value={u.rol}
                  onChange={(e) => cambiarRol(u.id_rol, e.target.value)}
                >
                  <option value="usuario">usuario</option>
                  <option value="administrador">administrador</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  ); 

};

export default AdminRoles2;
