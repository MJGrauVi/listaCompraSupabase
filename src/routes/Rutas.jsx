import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import FormularioProducto from "../components/FormularioProducto.jsx";
import CrearEliminarListasCompra from "../componentesListas/CrearEliminarListasCompra.jsx";
import ListadoListas from "../componentesListas/ListadoListas.jsx";
import VerListaCompra from "../componentesListas/VerListaCompra.jsx";
import DetalleCompra from "../componentesListas/DetalleCompra.jsx";
import Listado from "../components/Listado.jsx";
import Error from "../pages/Error.jsx";
import LoginForm from "../components/LoginForm.jsx";
import AdminRoles from "../pages/AdminRoles.jsx";
import RutaAdmin from "../routes/RutaAdmin.jsx";
import useContextoSesion from "../hooks/useContextoSesion.js";
import Perfil from "../components/Perfil.jsx";

const Rutas = () => {
  const { usuario } = useContextoSesion();

  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/productos" element={<Listado />} />
      <Route path="/perfil" element={<Perfil />} />
      {/* Privadas */}
      {usuario && (
        <>
          <Route path="/insertar" element={<FormularioProducto />} />
          <Route
            path="/productos/:id/editar"
            element={<FormularioProducto />}
          />

          <Route
            path="/crearListaCompra"
            element={<CrearEliminarListasCompra />}
          />
          <Route
            path="/listasCompra/:id/eliminar"
            element={<CrearEliminarListasCompra />}
          />
          <Route path="/listasCompra" element={<ListadoListas />} />
          <Route path="/listasCompra/:id" element={<VerListaCompra />} />
          <Route path="/listasCompra/:id/detalle" element={<DetalleCompra />} />
        </>
      )}
      {/* Ruta solo para administradores */}{" "}
      {/* <Route path="/adminRoles" element={<RutaAdmin><AdminRoles /></RutaAdmin>}/> */}
      <Route path="/adminRoles" element={<AdminRoles />}/>

      {/* 404 */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Rutas;
