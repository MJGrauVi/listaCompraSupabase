import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio.jsx";
import Contenedor from "../pages/Contenedor.jsx";
import ListadoProductos from "../components/ListadoProductos.jsx";
import Error from "../pages/Error.jsx";
import LoginForm from "../components/LoginForm.jsx";
import useSesion from "../hooks/useSesion.js";

const RutasAntiguo = () => {
  const { usuario } = useSesion();
  console.log(`Usuario: ${usuario}`);
  return (
    <div className="contenedor-rutas">
      <Routes>
        {/* Rutas siempre disponibles */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<LoginForm />} />

        {!usuario ? (
          //Si no hay usuario, permitimos login.
          <>
            <Route path="/" element={<Inicio />} />
          </>
        ) : (
          // Rutas solo para autenticados
          <>
            {/*    Parte Privada */}
            <Route path="/" element={<Inicio />} />
            <Route path="insertar" element={<Contenedor />} />
            <Route path="productos" element={<ListadoProductos />} />
            <Route path="productos/:id/editar" element={<Contenedor />} />
          </>
        )}
        {/* Ruta de error siempre */}
       {/*  <Route path="*" element={<Error />} /> */}

      </Routes>
    </div>
  );
};
export default RutasAntiguo;