import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useContextoListasCompra from "../hooks/useContextoListasCompra.js";
import Cargando from "../components/Cargando.jsx";
import Mensaje from "../components/Mensaje.jsx";
import { formatoSegunTipo } from "../biblioteca/funciones.js";
import {
  calcularPesoTotal,
  calcularPrecioTotal,
} from "../biblioteca/funciones.js";
import "./DetalleCompra.css";

const DetalleCompra = () => {
  const { id } = useParams();

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
  }, [id]);

  const pesoReal = calcularPesoTotal(detalleListaCompra); // número.
  
  const pesoTotal = formatoSegunTipo(pesoReal, "peso"); // string formateado
 
  const necesitaTransporte = pesoReal > 1500;

  const precio = calcularPrecioTotal(detalleListaCompra); //número.
  const precioTotal = formatoSegunTipo(precio,"precio");

  useEffect(() => {
    if (pesoReal > 1500) {
      setMostrarMensaje(true);
    
      const timer = setTimeout(() => {
        setMostrarMensaje(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [pesoReal]);

  if (!listaInfo) return <Cargando />;

  return (
    <div className="detalle-container">
      <h2 className="detalle-titulo">Detalle de la lista</h2>

      <div className="detalle-card">
        <h3 className="detalle-nombre">{listaInfo.nombre_lista}</h3>

        <p className="detalle-fecha">
          Fecha creación:{" "}
          <strong>{listaInfo.created_at.toLocaleDateString("es-ES")}</strong>
        </p>

        <div className="detalle-productos">
          <h4>Productos incluidos</h4>
          <ul>
            {detalleListaCompra.map((item) => (
              <li key={item.productos.id}>
                <strong>{item.productos.nombre}</strong> — {item.cantidad} uds.
              </li>
            ))}
          </ul>
        </div>

        <hr />

        <p className="detalle-total">
          <strong>Importe total:</strong> <span>{precioTotal}</span>
        </p>

        <p className="detalle-peso">
          <strong>Peso total:</strong> <span>{pesoTotal}</span>
        </p>

        {necesitaTransporte && mostrarMensaje && (
          <Mensaje
            tipo="mensaje-flotante"
            texto="La compra supera los 15 kg. Considera usar el coche."
            
          />
        )}
      </div>
    </div>
  );
};

export default DetalleCompra;
