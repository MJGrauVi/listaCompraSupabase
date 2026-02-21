
import { Link } from "react-router-dom";
import useContextoSesion from "../hooks/useContextoSesion.js";
import "./Menu.css";

const Menu = () => {
  const { usuario, rol } = useContextoSesion();

  return (
    <nav>
      <Link className="menu-elemento" to="/">
        Inicio
      </Link>

      {/* Mostrar Productos SOLO si: - NO hay usuario logueado - O el usuario es administrador */}
      {(!usuario || rol === "administrador") && (
        <Link className="menu-elemento" to="/productos">
          Productos
        </Link>
      )}

      {/* MENÚ PARA USUARIO NORMAL */}
      {usuario && rol === "usuario" && (
        <>
          <Link className="menu-elemento" to="/crearListaCompra">
            Crear Lista compra
          </Link>
          <Link className="menu-elemento" to="/listasCompra">
            Ver Listas compra
          </Link>
        </>
      )}

      {/* MENÚ PARA ADMINISTRADOR */}
      {usuario && rol === "administrador" && (
        <>
          <Link className="menu-elemento" to="/listasCompra">
            Ver Listas compra
          </Link>

          <Link className="menu-elemento" to="/insertar">
            Insertar Producto
          </Link>

          <Link className="menu-elemento" to="/adminRoles">
            Administrar Roles
          </Link>
        </>
      )}
    </nav>
  );
};

export default Menu;
