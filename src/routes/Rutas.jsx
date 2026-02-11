import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import FormularioProducto from "../components/FormularioProducto.jsx";
import CrearListasCompra from "../componentesListas/CrearListasCompra.jsx";
import ListadoListas from "../componentesListas/ListadoListas.jsx";
import VerListaCompra from "../componentesListas/VerListaCompra.jsx";
import DetalleCompra from "../componentesListas/DetalleCompra.jsx";
import Listado from "../components/Listado.jsx";
import Error from "../pages/Error.jsx";
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
          <Route path="/insertar" element={<FormularioProducto />} />
          <Route path="/productos/:id/editar" element={<FormularioProducto />} />
          
          <Route path="/crearListaCompra" element={<CrearListasCompra />} />
          <Route path="/listasCompra/:id/editar" element={<CrearListasCompra />} />
          <Route path="/listasCompra" element={<ListadoListas />} />
          <Route path="/listasCompra/:id" element={<VerListaCompra />} />
          <Route path="/listasCompra/:id/detalle" element={<DetalleCompra />} />
        </>
      )}

      {/* 404 */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Rutas;
