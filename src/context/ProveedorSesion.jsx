import { createContext, useEffect, useState } from "react";
import { supabaseConexion } from "../supabase/supabase.js";
import useSupabaseAuth from "./../hooks/useSupabaseAuth.js"; 



const ContextoSesion = createContext();

const ProveedorSesion = ({ children }) => {
  // Estado global de sesión(supabase devuelve null cuando no hay user.)
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Traemos de useSupabaseAuth;
  const { login, registro, logout, cargando, error, getRol } = useSupabaseAuth();

  // Sesión inicial, con getSesion para arrancar.
  useEffect(() => {
    //podemos omitir getSesion(), porque supabase escucha y dispara automaticamente event === "INITIAL_SESSION", pero
    //así controlo yo momento del arranque de la app.
    //  Escucha cambios de Auth (Login/Logout) en tiempo real
    const { data: authListener } = supabaseConexion.auth.onAuthStateChange(
      (event, session) => {
        setUsuario(session?.user ?? null);
        setLoading(false);
      },
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
  const obtenerRolUsuario = async ()=>{
    const rol = await getRol();
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
        obtenerRolUsuario
      }}
    >
      {!loading && children}
    </ContextoSesion.Provider>
  );
};

export default ProveedorSesion;
export { ContextoSesion };
