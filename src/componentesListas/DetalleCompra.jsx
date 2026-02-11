import React from "react";
import { useEffect, useState } from "react";
import useContextoListasCompra from "../hooks/useContextoListasCompra.js";
import Cargando from "../components/Cargando.jsx";
import Mensaje from "../components/Mensaje.jsx";
import {useParams} from "react-router-dom";

import {
  calcularPesoTotal,
  calcularPrecioTotal,
} from "../biblioteca/funciones.js";

const DetalleCompra = ({ idListaCompra }) => {
    const {id}= useParams();
  const {
    detalleListaCompra,
    cargarDetalleListaCompra,
    obtenerListaCompraPorId,
  } = useContextoListasCompra();

  const [listaInfo, setListaInfo] = useState(null);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      if (!id) return;

      await cargarDetalleListaCompra(id);

      const listaCompra = await obtenerListaCompraPorId(id);
      listaCompra.created_at = new Date(listaCompra.created_at);

      setListaInfo(listaCompra);
    };
    cargarDatos();
  }, [idListaCompra]);

  const pesoTotal = calcularPesoTotal(detalleListaCompra);
  const precioTotal = calcularPrecioTotal(detalleListaCompra);
  const necesitaTransporte = pesoTotal > 1500;

  useEffect(() => {
    if (pesoTotal > 15000) {

      setMostrarMensaje(true);

      const timer = setTimeout(() => {
        setMostrarMensaje(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [pesoTotal]);

 
  if (!listaInfo) return <Cargando />;

  return (
    <div>
      <h3>Detalle de la lista</h3>

      <p>Fecha creación: {listaInfo.created_at.toLocaleDateString("es-ES")}</p>

      <ul>
        {detalleListaCompra.map((item) => (
          <li key={item.productos.id}>
            {item.productos.nombre} — {item.cantidad} uds.
          </li>
        ))}
      </ul>

      <hr />

      <p>Total: {precioTotal.toFixed(2)} €</p>
      <p>Peso total: {pesoTotal} Gr.</p>

      {necesitaTransporte && (
        <Mensaje
          tipo="error"
          texto="La compra supera los 15 kg. Considera usar el coche."
        />
      )}
    </div>
  );
};

export default DetalleCompra;
