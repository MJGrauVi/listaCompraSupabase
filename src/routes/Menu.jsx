import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  return (
    <>
      <nav>
        <Link className="menu-elemento" to="/">
          Inicio
        </Link>
        <Link className="menu-elemento" to="/insertar">
          Insertar
        </Link>
        <Link className="menu-elemento" to="/listadoDiscos">
          Listado
        </Link>
      </nav>
    </>
  );
};

export default Menu;
