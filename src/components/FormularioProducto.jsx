import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./FormularioProducto.css";
import Errores from "./Errores.jsx";
import Cargando from "./Cargando.jsx";
import { validarProducto, parsePrecio } from "../biblioteca/funciones.js";

import useProductos from "../hooks/useProductos.js";

//Formulario para insertar o editar Productos.
const FormularioProducto = () => {
  console.log("🟢 FormularioProducto MONTADO");
  const { productos, guardarProducto, editarProducto, cargando } =useProductos(); //Para consumir los datos del contexto.
  const { id } = useParams(); //Obtenemos el id del elemento que queremos editar.
  const navigate = useNavigate(); //Para redirigir despues de actualizar un producto.
  const esEdicion = !!id; //Si hay id el la URL estará editando y sino está creando.

  // Valores iniciales del formulario
  const valoresIniciales = {
    nombre: "",
    peso: "",
    precio: "",
    imagen_url: "",
    descripcion: "",
  };
  console.log("FormularioProducto renderizado");
  const [producto, setProducto] = useState(valoresIniciales);
  const [errores, setErrores] = useState([]);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  // Cargar datos del producto si estamos editando
  useEffect(() => {
    if (!esEdicion) return;
    //Protección por si el contexto aún no se ha inicializado.
    if (!Array.isArray(productos) || productos.length === 0) return;

    const productoEncontrado = productos.find((d) => String(d.id) === id);

    if (productoEncontrado) {
      //Mostramos en pantalla datos numéricos formateados.
      setProducto({
        nombre: productoEncontrado.nombre || "",
        peso: productoEncontrado.peso.toString().replace(".", ",") || "",
        precio: productoEncontrado.precio.toLocaleString("es-ES") || "",
        imagen_url: productoEncontrado.imagen_url || "",
        descripcion: productoEncontrado.descripcion || "",
      });
    }
  }, [id, productos, esEdicion]);

  /* Actualiza el estado del formulario cuando cambia un campo */

  const actualizarDato = (evento) => {
    const { name, value, type, checked } = evento.target;
    const nuevoValor = type === "checkbox" ? checked : value; //ternaria para tomar el valor sobre el tipo de dato correcto.

    setProducto((estadoPrevio) => {
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
    evento.preventDefault(); //Eliminamos el comportamiento por defecto de submit en el form.

    // Validar todos los campos
    const listaErroresValidacion = validarProducto(producto);
    setErrores(listaErroresValidacion);

    //Si ha habido errores de validación lanzamos mensaje del tipo "error".
    if (listaErroresValidacion.length > 0) {
      setMensaje({
        tipo: "error",
        texto: "Por favor, corrija los errores en el formulario.",
      });
      return;
    }
    //Si todo ha ido bien creamos el producto.
    try {
      // Crear el objeto producto según las indicaciones.
      //Transformamos para guardar en bbdd a formato numero.
      const productoCompleto = {
        nombre: producto.nombre.trim(),
        peso: Number(producto.peso.replace(",", ".")),
        precio: parsePrecio(producto.precio), //Guardamos en bbdd 1234.50
        imagen_url: producto.imagen_url,
        descripcion: producto.descripcion || "",
      };
      //EDITAR
      //Sin estamos editando llamamos.
      if (esEdicion) {
        await editarProducto(id, productoCompleto);
        setMensaje({
          tipo: "exito",
          texto: `Producto "${productoCompleto.nombre}" actualizado correctamente.`,
        });
        setTimeout(() => {
          navigate("/listadoProductos");
        }, 5000);
      } else {
        //Guardamos el producto creado.
        await guardarProducto(productoCompleto);
        setMensaje({
          tipo: "exito",
          texto: `Producto "${productoCompleto.nombre}" añadido correctamente a la colección.`,
        });
        setTimeout(() => {
          navigate("/listadoProductos");
        }, 2000);
      }

      setProducto(valoresIniciales);
      setErrores([]);
    } catch (error) {
      console.error(error);
      setMensaje({
        tipo: "error",
        texto: "Error al guardar el producto. Por favor, inténtelo de nuevo.",
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
    <div className="contenedor-formulario-producto">

      <h2>Formulario cargando</h2>
      <h2>{esEdicion ? "Editar Producto" : "Insertar Producto"}</h2>

      <form onSubmit={manejarEnvio} className="formulario-producto">
        {/* Nombre del producto */}
        <div className="campo-formulario">
          <label htmlFor="nombre">
            Nombre del producto <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={producto.nombre}
            onChange={actualizarDato}
            className="input-formulario"
            placeholder="Nombre del producto"
          />
        </div>
        {/* Peso del producto */}
        <div className="campo-formulario">
          <label htmlFor="peso">
            Peso <span className="obligatorio">*</span>
          </label>
          <input
            type="text" //Para que el usuario pueda escribir 1.234,50 € en el input.
            id="peso"
            name="peso"
            value={producto.peso}
            onChange={actualizarDato}
            className="input-formulario"
            placeholder="Peso del producto"
          />
        </div>

        {/* Precio del producto */}
        <div className="campo-formulario">
          <label htmlFor="precio">
            Precio <span className="obligatorio">*</span>
          </label>
          <input
            type="text"
            id="precio"
            name="precio"
            value={producto.precio}
            onChange={actualizarDato}
            className="input-formulario"
            placeholder="Precio del producto"
          />
        </div>
        {/* Imagen_url */}
        <div className="campo-formulario">
          <label htmlFor="imagen_url">Imagen (URL)</label>
          <input
            type="text"
            id="imagen_url"
            name="imagen_url"
            value={producto.imagen_url}
            onChange={actualizarDato}
            className="input-formulario"
            placeholder="https://imagen-producto.jpg..."
          />
        </div>
        {/* Descripción */}
        <div className="campo-formulario">
          <label htmlFor="descripcion">
            Descripción del producto <span className="obligatorio">*</span>
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={actualizarDato}
            className="input-formulario textarea-descripcion"
            placeholder="Descripción del producto"
            rows="4"
          />
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

export default FormularioProducto;
