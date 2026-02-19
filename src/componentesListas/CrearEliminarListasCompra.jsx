import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CrearEliminarListasCompra.css";
import Errores from "../components/Errores.jsx";
import Cargando from "../components/Cargando.jsx";
import { validarListaCompra } from "../biblioteca/funciones.js";
import useSesion from "../hooks/useContextoSesion.js";
import useContextoListasCompra from "../hooks/useContextoListasCompra.js";

// Formulario para insertar o eliminar listaCompras.
const CrearEliminarListasCompra = () => {
  const { usuario } = useSesion();

  const {
    guardarListaCompra,
    obtenerListaCompraPorId,
    borrarListaCompra,   
    cargando
  } = useContextoListasCompra();

  const { id } = useParams();//Toma el parámetro id de la url
  const navigate = useNavigate();
  const esEdicion = !!id; // Si hay id, significa ELIMINAR.

  const valoresIniciales = {
    nombre_lista: "",
    propietario_id: "",
  };

  const [listaCompra, setListaCompra] = useState(valoresIniciales);
  const [errores, setErrores] = useState([]);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  // Cargar datos si estamos eliminando.
  useEffect(() => {
    const cargarListaCompra = async () => {
      if (!esEdicion) return;

      const listaCompraEncontrada = await obtenerListaCompraPorId(id);
      if (listaCompraEncontrada) {
        setListaCompra({
          nombre_lista: listaCompraEncontrada.nombre_lista || "",
          propietario_id: listaCompraEncontrada.propietario_id || "",
        });
      }
    };
    cargarListaCompra();
  }, [id, esEdicion]);

  const actualizarDato = (evento) => {
    const { name, value } = evento.target;
    setListaCompra((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMensaje({ tipo: "", texto: "" });
  };

  // Submit del formulario.
  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    // Si NO es edición; CREAR (igual que antes).
    if (!esEdicion) {

// Construimos el objeto REAL que vamos a insertar *****************
  const listaCompraCompleta = { 
    nombre_lista: listaCompra.nombre_lista.trim(), 
    propietario_id: usuario.id, // ← AQUÍ está la clave 
    };

      const listaErroresValidacion = validarListaCompra(listaCompraCompleta);
      setErrores(listaErroresValidacion);

      if (listaErroresValidacion.length > 0) {
        setMensaje({
          tipo: "error",
          texto: "Por favor, corrija los errores en el formulario.",
        });
        return;
      }

      try {
        const listaCompraCompleta = {
          nombre_lista: listaCompra.nombre_lista.trim(),
          propietario_id: usuario.id,
        };

        await guardarListaCompra(listaCompraCompleta);

        setMensaje({
          tipo: "exito",
          texto: `Lista "${listaCompraCompleta.nombre_lista}" creada correctamente.`,
        });

        setTimeout(() => navigate("/productos"), 2000);
      } catch (error) {
        console.error(error);
        setMensaje({
          tipo: "error",
          texto: "Error al guardar la lista. Inténtelo de nuevo.",
        });
      }

      return;
    }

    // Si SÍ es edición eliminamos la lista.
    try {
      await borrarListaCompra(id);

      setMensaje({
        tipo: "exito",
        texto: `La lista "${listaCompra.nombre_lista}" ha sido eliminada correctamente.`,
      });

      setTimeout(() => navigate("/listasCompra"), 2000);
    } catch (error) {
      console.error(error);
      setMensaje({
        tipo: "error",
        texto: "Error al eliminar la lista. Inténtelo de nuevo.",
      });
    }
  };

  const todosLosErrores = Object.values(errores).flat();

  if (!listaCompra) return <Cargando />;

  return (
    <div className="contenedor-formulario-listaCompra">
      <h2>
        {esEdicion ? "¿Deseas eliminar la lista?" : "Crear Lista"}
      </h2>

      <form onSubmit={manejarEnvio} className="formulario-listaCompra">
        {/* Nombre de la lista */}
        <div className="campo-formulario">
          <label htmlFor="nombre_lista">
            Nombre de la lista <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="nombre_lista"
            name="nombre_lista"
            value={listaCompra.nombre_lista}
            onChange={actualizarDato}
            className="input-formulario"
            placeholder="Nombre de la lista de la compra"
            disabled={esEdicion}   // ← No editable si estamos eliminando
          />
        </div>

        <button type="submit" className="boton-guardar">
          {cargando
            ? esEdicion ? "Eliminando..." : "Guardando..."
            : esEdicion ? "Eliminar" : "Guardar"}
        </button>
      </form>

      {mensaje.texto && (
        <div
          className={`mensaje-formulario ${
            mensaje.tipo === "exito" ? "mensaje-exito" : "mensaje-error"
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      {todosLosErrores.length > 0 && (
        <Errores erroresMostrar={todosLosErrores} />
      )}
    </div>
  );
};

export default CrearEliminarListasCompra;
