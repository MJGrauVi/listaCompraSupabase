import React from "react";
import { Link } from "react-router-dom";
import useContextoSesion from "../hooks/useContextoSesion.js";

import "./Menu.css";

const Menu = () => {
  const { usuario } = useContextoSesion();
  return (
    <>
      <nav>
        {
          <Link className="menu-elemento" to="/">
            Inicio
          </Link>
        }
        <Link className="menu-elemento" to="/productos">
          Productos
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
        
          </>
        )}
      </nav>
    </>
  );
};

export default Menu;
