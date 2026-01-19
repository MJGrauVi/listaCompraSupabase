import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Contenedor from "../pages/Contenedor.jsx";
import ListadoDiscos from "../components/ListadoDiscos.jsx";
import Error from "../pages/Error";

const Rutas = () => {
  return (
    <div className="contenedor-rutas">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="insertar" element={<Contenedor />} />
        <Route path="listadoDiscos" element={<ListadoDiscos />} />
        <Route path="discos/:id/editar" element={<Contenedor />} />
        {/* <Route path="discos/:id" element={<Contenedor />} /> */}
        <Route path="*" element={<Error />}/>
      </Routes>
    </div>
  );
};
export default Rutas;