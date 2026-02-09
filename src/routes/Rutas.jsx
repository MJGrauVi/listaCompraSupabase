import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Contenedor from "../pages/Contenedor.jsx";
import Listado from "../components/Listado.jsx";
import Error from "../pages/Error";
import LoginForm from "../components/LoginForm.jsx";
import useContextoSesion from "../hooks/useContextoSesion.js";

const Rutas = () => {
  const { usuario } = useContextoSesion();

  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/productos" element={<Listado />} />

      {/* Privadas */}
      {usuario && (
        <>
          <Route path="/insertar" element={<Contenedor />} />
          <Route path="/productos/:id/editar" element={<Contenedor />} />
        </>
      )}

      {/* 404 */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Rutas;
