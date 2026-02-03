import React from "react";
import { Link } from "react-router-dom";
import useSesion from "../hooks/useSesion.js";
import "./Menu.css";

const Menu = () => {
  const { usuario } = useSesion();
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
            {/*  <pre>{JSON.stringify(usuario, null, 2)}</pre> */}
            <Link className="menu-elemento" to="/insertar">
              Insertar
            </Link>
        {/*     <Link className="menu-elemento" to="/productos">
              Listado
            </Link> */}
          </>
        )}
      </nav>
    </>
  );
};

export default Menu;
