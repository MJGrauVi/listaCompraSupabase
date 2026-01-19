import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./FormularioDisco.css";
import Errores from "./Errores.jsx";
import Cargando from "./Cargando.jsx";
import { validarDisco } from "../biblioteca/funciones.js";
import useDiscos from "../hooks/useDiscos.js";


//Formulario para insertar o editar disco.
const FormularioDisco = () => {
  const { discos, guardarDisco, editarDiscoCompleto, cargando } = useDiscos(); //Para consumir los datos del contexto.
  const { id } = useParams(); //Obtenemos el id del elemento que queremos editar.
  const navigate = useNavigate(); //Para redirigir despues de actualizar un disco.
  const esEdicion = !!id; //Si hay id el la URL estará editando y sino está creando.

  // Valores iniciales del formulario
  const valoresIniciales = {
    nombreDisco: "",
    url_caratula: "",
    tipoGrupo: "",
    grupo: "",
    genero: "",
    lanzamiento: "",
    localizacion: "",
    prestado: false,
  };

  const [disco, setDisco] = useState(valoresIniciales);
  const [errores, setErrores] = useState([]);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  const generosMusicales = ["Rock", "Pop", "Jazz", "Clásica"];

  // Cargar datos del disco si estamos editando
  useEffect(() => {

    if (!esEdicion) return;
    //Protección por si el contexto aún no se ha inicializado.
    if (!Array.isArray(discos) || discos.length === 0) return;

    const discoEncontrado = discos.find((d) => String(d.id) === id);

    if (discoEncontrado) {

      setDisco({
        nombreDisco: discoEncontrado.nombreDisco || "",
        url_caratula: discoEncontrado.url_caratula || "",
        tipoGrupo: discoEncontrado.tipoGrupo || "",
        grupo: discoEncontrado.grupo || "",
        genero: discoEncontrado.genero || "",
        lanzamiento: discoEncontrado.lanzamiento || "",
        localizacion: discoEncontrado.localizacion || "",
        prestado: discoEncontrado.prestado || false,
      });
    }
  }, [id, discos, esEdicion]);

  /* Actualiza el estado del formulario cuando cambia un campo */

  const actualizarDato = (evento) => {
    const { name, value, type, checked } = evento.target;
    const nuevoValor = type === "checkbox" ? checked : value; //ternaria para tomar el valor sobre el tipo de dato correcto.

    setDisco((estadoPrevio) => {
      const nuevoEstado = {
        ...estadoPrevio,
        [name]: nuevoValor,
      };
      return nuevoEstado;
    });

    setMensaje({ tipo: "", texto: "" }); //Limpia mensaje antiguo.
  };

  //SUBMIT DEL FORMULARIO.
  //CREAR.
  const manejarEnvio = async (evento) => {
    evento.preventDefault();//Eliminamos el comportamiento por defecto de submit en el form.

    // Validar todos los campos
    const listaErroresValidacion = validarDisco(disco);
    setErrores(listaErroresValidacion);

    //Si ha habido errores de validación lanzamos mensaje del tipo "error".
    if (listaErroresValidacion.length > 0) {
      setMensaje({
        tipo: "error",
        texto: "Por favor, corrija los errores en el formulario.",
      });
      return;
    }
    //Si todo ha ido bien creamos el disco.
    try {
      // Crear el objeto disco según la estructura de la API.
   
      const discoCompleto = {
        nombreDisco: disco.nombreDisco.trim(),
        url_caratula: disco.url_caratula.trim(),
        tipoGrupo: disco.tipoGrupo,
        grupo: disco.grupo.trim(),
        genero: disco.genero,
        lanzamiento: disco.lanzamiento.trim(),
        localizacion: disco.localizacion.toUpperCase().trim(),
        prestado: disco.prestado,
        listado_canciones: [],
      };
      //EDITAR
      //Sin estamos editando llamamos.
      if (esEdicion) {
        await editarDiscoCompleto(id, discoCompleto);
        setMensaje({
          tipo: "exito",
          texto: `Disco "${discoCompleto.nombreDisco}" actualizado correctamente.`,
        });
        setTimeout(() => {
          navigate("/listadoDiscos");
        }, 5000);
      } else {
        //Guardamos el disco creado.
        await guardarDisco(discoCompleto);
        setMensaje({
          tipo: "exito",
          texto: `Disco "${discoCompleto.nombreDisco}" añadido correctamente a la colección.`,
        });
        setTimeout(() => {
          navigate("/listadoDiscos");
        }, 2000);
      }

      setDisco(valoresIniciales);
      setErrores([]);
    } catch (error) {
      console.error(error);
      setMensaje({
        tipo: "error",
        texto: "Error al guardar el disco. Por favor, inténtelo de nuevo.",
      });
    }
  };

  /*   const obtenerClaseError = (nombreCampo) => {
      return errores[nombreCampo] && errores[nombreCampo].length > 0
        ? "campo-error"
        : "";
    }; */

  const todosLosErrores = Object.values(errores).flat();
  //Renderizado bloqueante que sustituye al formulario.Muestra espiner mientras espera datos.
  if (cargando) {
    return <Cargando />;
  }

  return (
    <div className="contenedor-formulario-disco">
      <h2>{esEdicion ? "Editar Disco" : "Insertar Disco"}</h2>

      <form onSubmit={manejarEnvio} className="formulario-disco">
        {/* Nombre del disco */}
        <div className="campo-formulario">
          <label htmlFor="nombreDisco">
            Nombre del disco <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="nombreDisco"
            name="nombreDisco"
            value={disco.nombreDisco}
            onChange={actualizarDato}
            className="input-formulario"
            placeholder="Nombre del disco"
          />
        </div>

        {/* Carátula del disco */}
        <div className="campo-formulario">
          <label htmlFor="url_caratula">Carátula del disco (URL)</label>
          <input
            type="text"
            id="url_caratula"
            name="url_caratula"
            value={disco.url_caratula}
            onChange={actualizarDato}
            className="input-formulario"
            placeholder="https://caratula-disco.jpg..."
          />
        </div>

        {/* Tipo: Grupo musical o Solista */}
        <div className="campo-formulario">
          <label>
            Grupo músical o solista <span className="obligatorio">*</span>
          </label>
          <div className="radio-group">
            <label className="label-radio">
              <input
                type="radio"
                name="tipoGrupo"
                value="Grupo musical"
                checked={disco.tipoGrupo === "Grupo musical"}
                onChange={actualizarDato}
              />
              Grupo musical
            </label>
            <label className="label-radio">
              <input
                type="radio"
                name="tipoGrupo"
                value="Solista"
                checked={disco.tipoGrupo === "Solista"}
                onChange={actualizarDato}
              />
              Solista
            </label>
          </div>
        </div>

        {/* Nombre del grupo o solista */}
        <div className="campo-formulario">
          <label htmlFor="grupo">
            Nombre <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="grupo"
            name="grupo"
            value={disco.grupo}
            onChange={actualizarDato}
            className="input-formulario"
            placeholder="Nombre del grupo o solista"
          />
        </div>

        {/* Género musical */}
        <div className="campo-formulario">
          <label htmlFor="genero">
            Género musical <span className="obligatorio">*</span>
          </label>
          <select
            id="genero"
            name="genero"
            value={disco.genero}
            onChange={actualizarDato}
            className="input-formulario"
          >
            <option value="">Seleccione un género</option>
            {generosMusicales.map((genero) => (
              <option key={genero} value={genero}>
                {genero}
              </option>
            ))}
          </select>
        </div>

        {/* Año de publicación */}
        <div className="campo-formulario">
          <label htmlFor="lanzamiento">
            Año de publicación <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="lanzamiento"
            name="lanzamiento"
            value={disco.lanzamiento}
            onChange={actualizarDato}
            className="input-formulario"
            placeholder="YYYY"
            maxLength="4"
          />
        </div>

        {/* Localización */}
        <div className="campo-formulario">
          <label htmlFor="localizacion">
            Localización <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="localizacion"
            name="localizacion"
            value={disco.localizacion}
            onChange={actualizarDato}
            className="input-formulario"
            placeholder="ES-001AA"
          />
        </div>

        {/* Prestado */}
        <div className="campo-formulario">
          <label htmlFor="prestado" className="label-checkbox">
            <input
              type="checkbox"
              id="prestado"
              name="prestado"
              checked={disco.prestado}
              onChange={actualizarDato}
              className="checkbox-formulario"
            />
            Prestado
          </label>
        </div>

        <button type="submit" className="boton-guardar">
          {cargando
            ? "Guardando...."
            : esEdicion
              ? "Actualizar Datos"
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

export default FormularioDisco;
