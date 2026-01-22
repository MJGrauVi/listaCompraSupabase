import React, {createContext, useState, useEffect} from "react";
import {supabaseConexion} from "../supabase/supabase.js";
import {useNavigate} from "react-router-dom";

const contextoSesion = createContext();








const datosAproveer = {

};

const ProveedorSesion = () => {
  return (
    <contextoSesion.Provider value={datosAproveer}>
      {children}
    </contextoSesion.Provider>
  )
}

export default ProveedorSesion;
export {contextoSesion};

