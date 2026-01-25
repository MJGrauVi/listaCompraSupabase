import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Contenedor from "../pages/Contenedor.jsx";
import Listado from "../components/Listado.jsx";
import Error from "../pages/Error";
import LoginForm from "../components/LoginForm.jsx";
import useSesion from "../hooks/useSesion.js";

const Rutas = () => {
  const { usuario } = useSesion();
  return (
    <div className="contenedor-rutas">
      <Routes>
        {/* Rutas siempre disponibles */}
        <Route path="/" element={<Inicio />} />

        {!usuario ? (
          //Si no hay usuario, permitimos login.
          <>
            <Route path="/login" element={<LoginForm />} />
          </>
        ) : (
          // Rutas solo para autenticados
          <>
            {/*    Parte Privada */}
            <Route path="/" element={<Inicio />} />
            <Route path="insertar" element={<Contenedor />} />
            <Route path="productos" element={<Listado />} />
            <Route path="productos/:id/editar" element={<Contenedor />} />
          </>
        )}
        {/* Ruta de error siempre */}
        <Route path="*" element={<Error />} />

      </Routes>
    </div>
  );
};
export default Rutas;
