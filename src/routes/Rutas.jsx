import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Contenedor from "../pages/Contenedor.jsx";
import ListadoProductos from "../components/ListadoProductos.jsx";
import Error from "../pages/Error";
import LoginForm from "../components/LoginForm.jsx";
import useSesion from "../hooks/useSesion.js";

const Rutas = () => {
  const { usuario } = useSesion();

  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<LoginForm />} />

      {/* Privadas */}
      {usuario && (
        <>
          <Route path="/insertar" element={<Contenedor />} />
          <Route path="/productos" element={<ListadoProductos />} />
          <Route path="/productos/:id/editar" element={<Contenedor />} />
        </>
      )}

      <Route path="*" element={<Error />} />
    </Routes>
    
  );
};
export default Rutas;