import React, { useState } from "react";

//Hook para la comunicacion con la API.
const useAPI = () => {
  //Estos estados serán consumidos por el contexto en los siguientes casos:
  //Estado cuando hay una petición en curso.
  const [cargando, setCargando] = useState(true);
  //Estado para errores de conexión con la API.
  const [error, setError] = useState(null);

  //Petición genérica a la API, pasando el método y otras opciones como parámetro.
  const solicitarA = async (url, options = {}) => {
    setCargando(true);
    setError(null);

    try {
      //Simulacion retardo carga datos.(Eliminaremos en producción)
     // await new Promise(resolve => setTimeout(resolve, 2000));

      const respuesta = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options,
      });

      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
      }
      // Si no hay contenido (204), no intentar leer JSON para que no falle solicitarA al hacer .json().
      if (respuesta.status === 204) {
        return null;
      }

      return await respuesta.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  /******************************************************************************** */
  //Incluir el ID  del elemento a eliminar o editar cuando llamemos a la función. 
  /******************************************************************************* */

  //Funcion con el método GET, método por defecto si no se especifica.
  const cargarDatos = (url) => {
    return solicitarA(url, {
      method: "GET"
    });
  };

  //Función para el método POST.
  const guardarDatos = (url, body) => {
    return solicitarA(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  //Función para el método PUT, edita objeto completo.
  const editarDatosCompleto = (url, body) => {
    return solicitarA(url, {
      method: "PUT",
      body: JSON.stringify(body)
    });
  };

  //Función para el método PATCH, edición parcial.
  const editarParteDatos = (url, body) => {
    return solicitarA(url, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  };

  const borrarDatos = (url) => {
    return solicitarA(url, {
      method: "DELETE",
    });
  };


  return { cargando, error, cargarDatos, guardarDatos, editarDatosCompleto, editarParteDatos, borrarDatos };
};
export default useAPI;