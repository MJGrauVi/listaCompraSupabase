import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CrearListasCompra.css";
import Errores from "../components/Errores.jsx";
import Cargando from "../components/Cargando.jsx";
import {validarListaCompra} from "../biblioteca/funciones.js";
import useSesion from "../hooks/useContextoSesion.js"; 
import useContextoListasCompra from "../hooks/useContextoListasCompra.js";

//Formulario para insertar o editar listaCompras.
const CrearListasCompra = () => {
   const {usuario} = useSesion(); 
  const {
    guardarListaCompra,
    actualizarListaCompra,
    cargando,
    obtenerListaCompraPorId,
  } = useContextoListasCompra(); //Para consumir los datos del contexto.

  const { id } = useParams(); //Obtenemos el id del elemento que queremos editar.
  const navigate = useNavigate(); //Para redirigir despues de actualizar un listaCompra.
  const esEdicion = !!id; //Si hay id el la URL estará editando y sino está creando.

  // Valores iniciales del formulario
  const valoresIniciales = {
    nombre_lista: "",
    propietario_id: "",
  };

  const [listaCompra, setListaCompra] = useState(valoresIniciales);
  const [errores, setErrores] = useState([]);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

console.log("ID recibido:", id); 
console.log("¿Es edición?:", esEdicion);


  // Cargar datos del listaCompra si estamos editando
  useEffect(() => {
    console.log("useEffect ejecutado. esEdicion:", esEdicion, "id:", id);
    const cargarListaCompra = async () => {
      if (!esEdicion) return;

      const listaCompraEncontrada = await obtenerListaCompraPorId(id);
      console.log("Lista compra encontrado:", listaCompraEncontrada);
      if (listaCompraEncontrada) {
      
        //Reciba lista y metemos en el estado.
        setListaCompra({
          nombre_lista: listaCompraEncontrada.nombre_lista || "",
          propietario_id: listaCompraEncontrada.propietario_id || "",
       
        });
      }
    };
    cargarListaCompra();
  }, [id, esEdicion]);

  /* Actualiza el estado del formulario cuando cambia un campo */

  const actualizarDato = (evento) => {
    const { name, value } = evento.target;
    setListaCompra((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
    setMensaje({ tipo: "", texto: "" });
  };

  //Submit del formulario.
  //CREAR.
  const manejarEnvio = async (evento) => {
    evento.preventDefault(); //Eliminamos el comportamiento por defecto de submit en el form.

    // Validar todos los campos.
    const listaErroresValidacion = validarListaCompra(listaCompra);
    setErrores(listaErroresValidacion);

    //Si ha habido errores de validación lanzamos mensaje del tipo "error".
    if (listaErroresValidacion.length > 0) {
      setMensaje({
        tipo: "error",
        texto: "Por favor, corrija los errores en el formulario.",
      });
      return;
    }
    //Si todo ha ido bien creamos el listaCompra.
    try {
      // Crear lista de la compra según las indicaciones.
     
      const listaCompraCompleta = {
        nombre_lista: listaCompra.nombre_lista.trim(),
        propietario_id: 
        esEdicion 
        ? listaCompra.propietario_id //Se mantiene el id del propietario original.
        : usuario.id, //Asigno el id del usuario autenticado que crea la lista.
      };
      //EDITAR
      //Sin estamos editando llamamos.
      if (esEdicion) {
        await actualizarListaCompra(id, listaCompraCompleta);
        setMensaje({
          tipo: "exito",
          texto: `Lista de la compra "${listaCompraCompleta.nombre_lista}" actualizado correctamente.`,
        });
        //Muestro el listado a los 3 segundos.
        setTimeout(() => {
          navigate("/listas_compra");
        }, 3000);
      } else {
        //Guardamos la lista creada.
        await guardarListaCompra(listaCompraCompleta);
        setMensaje({
          tipo: "exito",
          texto: `Lista de la compra "${listaCompraCompleta.nombre_lista}" añadida correctamente a la colección.`,
        });
        setTimeout(() => {
          navigate("/productos");
        }, 2000);
      }

      setListaCompra(valoresIniciales);
      setErrores([]);
    } catch (error) {
      console.error(error);
      setMensaje({
        tipo: "error",
        texto: "Error al guardar la lista. Por favor, inténtelo de nuevo.",
      });
    }
  };
  //Aplana el array de errores [] a uno de strings.
  const todosLosErrores = Object.values(errores).flat();

  //Muestra espiner mientras espera la carga del formulario.
  if (!listaCompra) return <Cargando />;

  return (
    <div className="contenedor-formulario-listaCompra">
      <h2>
        {esEdicion
          ? "Editar Lista"
          : "Crear Lista."}
      </h2>

      <form onSubmit={manejarEnvio} className="formulario-listaCompra">
        {/* Nombre del listaCompra */}
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
            placeholder="Nombre de la lista de la Compra"
          />
        </div>

        
        {/* Mostramos texto distinto según el estado,  */}
        <button type="submit" className="boton-guardar">
          {cargando
            ? "Guardando...."
            : esEdicion
              ? "Actualizar"
              : "Guardar"}
        </button>
      </form>

      {mensaje.texto && (
        <div
          className={`mensaje-formulario ${mensaje.tipo === "exito" ? "mensaje-exito" : "mensaje-error"}`}
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

export default CrearListasCompra;
