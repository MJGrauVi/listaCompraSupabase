import "./App.css";
import { Routes, Route } from "react-router-dom";
import Menu from "./routes/Menu.jsx";
import Rutas from "./routes/Rutas.jsx";
import Contenedor from "./estructura/Contenedor.jsx";
import Header from "./estructura/Header.jsx";
import Footer from "./estructura/Footer.jsx";
import BotonSesion from "./components/BotonSesion.jsx";
import { useEffect } from "react";
import useSupabaseAuth from "./hooks/useSupabaseAuth";
import TestRol from "./hooks/TestRol.jsx";

const App = () => {
  const { getRol } = useSupabaseAuth(); 
  useEffect(() => { 
    const test = async () => { 
      const rol = await getRol("ee60bf1e-94ff-40eb-8c8c-482fd9f77198"); 
      console.log("TEST getRol:", rol); 
    }; test(); 
  }, []);


  return (
    <>
        <div className="contenedor-app">
          <TestRol />
          <Header>
            <BotonSesion />
          </Header>
          <Contenedor>
            <Menu />
            <Rutas />
          </Contenedor>
          <Footer />
        </div>
      
    </>
  );
};

export default App;
