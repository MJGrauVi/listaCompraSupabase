import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./FormularioProducto.css";
import Errores from "./Errores.jsx";
import Cargando from "./Cargando.jsx";
import {
  validarProducto,
  formatearPrecio,
  formatearPeso,
  parseNumeroES
} from "../biblioteca/funciones.js";
/* import useSesion from "../hooks/useContextoSesion.js"; */
import useContextoProductos from "../hooks/useContextoProductos.js";

//Formulario para insertar o editar Productos.
const FormularioProducto = () => {
  /* const {cargando} = useSesion(); */
  const {
    guardarProducto,
    actualizarProducto,
    cargando,
    obtenerProductoPorId,
  } = useContextoProductos(); //Para consumir los datos del contexto.
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

  const [producto, setProducto] = useState(valoresIniciales);
  const [errores, setErrores] = useState([]);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

console.log("ID recibido:", id); 
console.log("¿Es edición?:", esEdicion);


  // Cargar datos del producto si estamos editando
  useEffect(() => {
    console.log("useEffect ejecutado. esEdicion:", esEdicion, "id:", id);
    const cargarProducto = async () => {
      if (!esEdicion) return;

      const productoEncontrado = await obtenerProductoPorId(id);
      console.log("Producto encontrado:", productoEncontrado);
      if (productoEncontrado) {
        console.log("Precio antes de formatear:", productoEncontrado.precio, typeof productoEncontrado.precio);
        //Recibo producto y metemos en el estado.
        setProducto({
          nombre: productoEncontrado.nombre || "",
         /*  peso: `${productoEncontrado.peso.toLocaleString("es-ES")} gr.`, */ //To locale siempre devuelve string. 
          peso: formatearPrecio(productoEncontrado.peso) || "", 
         /* precio: formatearPrecio(productoEncontrado.precio) || "", //Cuando modificamos carga con decimales.
           precio: productoEncontrado.precio.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "",Cuando modificamos carga con decimales.  */
          imagen_url: productoEncontrado.imagen_url || "",
          descripcion: productoEncontrado.descripcion || "",
        });
      }
    };
    cargarProducto();
  }, [id, esEdicion]);

  /* Actualiza el estado del formulario cuando cambia un campo */

  const actualizarDato = (evento) => {
    const { name, value } = evento.target;
    setProducto((prev) => ({ 
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
        peso: parseNumeroES(producto.peso),
        precio: parseNumeroES(producto.precio), //Guardamos en bbdd 1234.50
        imagen_url: producto.imagen_url,
        descripcion: producto.descripcion || "",
      };
      //EDITAR
      //Sin estamos editando llamamos.
      if (esEdicion) {
        await actualizarProducto(id, productoCompleto);
        setMensaje({
          tipo: "exito",
          texto: `Producto "${productoCompleto.nombre}" actualizado correctamente.`,
        });
        //Muestro el listado a los 3 segundos.
        setTimeout(() => {
          navigate("/productos");
        }, 3000);
      } else {
        //Guardamos el producto creado.
        await guardarProducto(productoCompleto);
        setMensaje({
          tipo: "exito",
          texto: `Producto "${productoCompleto.nombre}" añadido correctamente a la colección.`,
        });
        setTimeout(() => {
          navigate("/productos");
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
  //Aplana el array de errores [] a uno de strings.
  const todosLosErrores = Object.values(errores).flat();

  //Muestra espiner mientras espera la carga del formulario.
  if (!producto) return <Cargando />;

  return (
    <div className="contenedor-formulario-producto">
      <h2>
        {esEdicion
          ? "Editar Producto"
          : "Insertar un producto a la base de datos."}
      </h2>

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
            onBlur={() => {
              setProducto((prev) => ({
                ...prev,
                peso: formatearPeso(prev.peso),
              }));
            }}
            className="input-formulario"
            placeholder="Peso del producto en gramos"
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
            onBlur={() => {
              setProducto((prev) => ({
                ...prev,
                precio: formatearPrecio(prev.precio),
              }));
            }}
            className="input-formulario"
            placeholder="Introduzca el precio en euros"
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
        {/* Mostramos texto distinto según el estado,  */}
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
