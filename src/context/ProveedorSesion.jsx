import { createContext, useEffect, useState } from "react";
import { supabaseConexion } from "../supabase/supabase.js";
import useSupabaseAuth from "./../hooks/useSupabaseAuth.js"; 


const ContextoSesion = createContext();

const ProveedorSesion = ({ children }) => {
  // Estado global de sesión(supabase devuelve null cuando no hay user.)
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rol, setRol] = useState(null);

  // Traemos de useSupabaseAuth;
  const { login, registro, logout, cargando, error, getRol } = useSupabaseAuth();

  // Sesión inicial, con getSesion para arrancar.
useEffect(() => {
  const { data: authListener } = supabaseConexion.auth.onAuthStateChange(
    async (event, session) => {
   
      const user = session?.user ?? null;
     
      //setUsuario(user);

      if (user) { const rolObtenido = await getRol(user.id); 
   
        setRol(rolObtenido); 
      } else { 
      
        setRol(null); 
      } 
      setLoading(false); 
    }
  );

  return () => authListener.subscription.unsubscribe();
}, []);


  const iniciarLogin = async (email, password) => {
    const user = await login(email, password);
    setUsuario(user);
  };

  const registrarUsuario = async (email, password, displayName) => {
    const user = await registro(email, password, displayName);
    setUsuario(user);
  };

  const cerrarSesion = async () => {
    await logout();
    setUsuario(null);
   
  };
  const obtenerRolUsuario = async (id)=>{
    const rol = await getRol(id);
    return rol;
  }

  return (
    <ContextoSesion.Provider
      value={{
        usuario,
        loading,
        cargando,
        error,
        iniciarLogin,
        registrarUsuario,
        cerrarSesion,
        obtenerRolUsuario,
        rol
      }}
    >
      {!loading && children}
    </ContextoSesion.Provider>
  );
};

export default ProveedorSesion;
export { ContextoSesion };
