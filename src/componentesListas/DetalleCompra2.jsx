import React from "react";
import { useEffect, useState } from "react";
import useContextoListasCompra from "../hooks/useContextoListasCompra.js";
import Cargando from "../components/Cargando.jsx";
import Mensaje from "../components/Mensaje.jsx";
import {useParams} from "react-router-dom";
import {formatoSegunTipo} from "../biblioteca/funciones.js";

import {
  calcularPesoTotal,
  calcularPrecioTotal,
} from "../biblioteca/funciones.js";

const DetalleCompra2 = () => {
    const {id}= useParams();//Id correcto desde la url.
  const {
    detalleListaCompra,
    cargarDetalleListaCompra,
    obtenerListaCompraPorId,
  } = useContextoListasCompra();

  const [listaInfo, setListaInfo] = useState(null);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  //Cargar datos cuando cambia el id.
  useEffect(() => {
    const cargarDatos = async () => {
      if (!id) return;

      await cargarDetalleListaCompra(id);

      const listaCompra = await obtenerListaCompraPorId(id);
      listaCompra.created_at = new Date(listaCompra.created_at);

      setListaInfo(listaCompra);
    };
    cargarDatos();
  }, [id]);

  const pesoTotal = formatoSegunTipo(calcularPesoTotal(detalleListaCompra), "peso");

  const precioTotal = formatoSegunTipo(calcularPrecioTotal(detalleListaCompra), "precio");

  console.log("tipo dato precoTotal: ",typeof precioTotal);
  const necesitaTransporte = pesoTotal > 1500;

  //Mostramos mensaje si la compra supera el peso establecido, en mi caso en gramos.
  //Pendiente tengo cambiar el formato a kg cuando supere los 999gr.

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
    <div className="detalle-container">
      <h3>Detalle de la lista: {listaInfo.nombre_lista}</h3>

      <p>Fecha creación: {listaInfo.created_at.toLocaleDateString("es-ES")}</p>

      <ul>
        {detalleListaCompra.map((item) => (
          <li key={item.productos.id}>
            {item.productos.nombre} — {item.cantidad} uds.
          </li>
        ))}
      </ul>

      <hr />

      <p>Importe total: {precioTotal}</p>
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

export default DetalleCompra2;
