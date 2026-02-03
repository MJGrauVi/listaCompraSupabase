import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Contenedor from "../pages/Contenedor.jsx";
import ListadoProductos from "../components/otrosComponentes/ListadoProductos.jsx";
import Listado from "../components/ListadoY.jsx";
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
      <Route path="/insertar" element={<Contenedor />} />
      <Route path="/productos" element={<Listado />} />

      {/* Privadas */}
      {usuario && (
        <>
          {/* <Route path="/insertar" element={<Contenedor />} /> */}
          {/* <Route path="/productos" element={<Listado />} /> */}
          <Route path="/productos/:id/editar" element={<Contenedor />} />
        </>
      )}

      <Route path="*" element={<Error />} />
    </Routes>
  );
};
export default Rutas;
