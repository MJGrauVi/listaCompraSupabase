import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useContextoSesion from "../hooks/useContextoSesion.js";

import "./Menu.css";

const Menu = () => {
  const { usuario, obtenerRolUsuario } = useContextoSesion();
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const cargarRol = async () => {
      if (usuario) {
        const r = await obtenerRolUsuario();
        setRol(r);
      } else {
        setRol(null);
      }
    };

    cargarRol();
  }, [usuario]);

  return (
    <nav>
      <Link className="menu-elemento" to="/">
        Inicio
      </Link>

      <Link className="menu-elemento" to="/productos">
        Productos
      </Link>
      
      <Link className="menu-elemento" to="/perfil">
      Perfil
      </Link>

      {usuario && (
        <>
          <Link className="menu-elemento" to="/insertar">
            Insertar
          </Link>

          <Link className="menu-elemento" to="/crearListaCompra">
            Crear Lista compra
          </Link>

          <Link className="menu-elemento" to="/listasCompra">
            Ver Listas compra
          </Link>

          {rol === "administrador" && (
            <Link className="menu-elemento" to="/adminRoles">
              Administrar Roles
            </Link>
          )}
        </>
      )}
    </nav>
  );
};

export default Menu;
