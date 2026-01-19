import { createContext, useEffect, useState } from "react";
import useAPI from "../hooks/useAPI.js";


//Creo el context
const ContextoDiscos = createContext();

const URL_API = "http://localhost:3001/discos";

const ProveedorDiscos = ({ children }) => {

  const [discos, setDiscos] = useState([]);
  const [discoExpandido, setDiscoExpandido] = useState(null);

   const { cargando, error, cargarDatos, guardarDatos, editarDatosCompleto, editarParteDatos, borrarDatos} = useAPI(); 
  

  const toggleDisco = (id) =>{
    setDiscoExpandido(prev => (prev === id ? null : id));
  }
  const cargarDiscos = async () => {
 
    try {
      const datos = await cargarDatos(URL_API);
      setDiscos(datos);
    } catch (error) {
      console.error(error);
    }
  };

  const guardarDisco = async (disco) => {
    await guardarDatos(URL_API, disco);
    await cargarDiscos();
  };

  const borrarDisco = async (id) => {
    await borrarDatos(`${URL_API}/${id}`);
    await cargarDiscos();
  };

  const editarDiscoCompleto = async (id, datos) => {
    await editarDatosCompleto(`${URL_API}/${id}`, datos);
    await cargarDiscos();
  };

  const editarDiscoParcial = async (id, datos) => {
    await editarParteDatos(`${URL_API}/${id}`, datos);
    await cargarDiscos();
  };


  useEffect(() => {
    cargarDiscos();
  }, []);

  //Provider proporciona los datos a los componentes a través de la propiedad value.
  return (
    <ContextoDiscos.Provider
      value={{
        discos,
        cargando,
        error,
        cargarDiscos,
        guardarDisco,
        borrarDisco,
        editarDiscoCompleto,
        editarDiscoParcial,
        discoExpandido, toggleDisco
      }}
    >
      {children}
    </ContextoDiscos.Provider>
  );
};
export default ProveedorDiscos;
export { ContextoDiscos };
