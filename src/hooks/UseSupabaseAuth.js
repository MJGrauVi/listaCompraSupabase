import { useState } from "react";
import { supabaseConexion } from "../supabase/supabase.js";

const useSupabaseAuth = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setCargando(true);
    setError(null);
    try {
      const { data, error } =
        await supabaseConexion.auth.signInWithPassword({ 
            email, 
            password/* , 
            options:{
          emailRedirectTo: "http://localhost:5173/",
        } */ });

      if (error) throw error;
      return data.user;
     
    } catch (err) {
      //Si hay error se guarda en el estado.
      setError(err.message);
      //Lanzo el error para que el contexto lo capture.
      throw err;
    } finally {
      setCargando(false);
    }
  };

  const registro = async (email, password, display_name) => {
    setCargando(true);
    setError(null);
    try {
      //Se crea un usuario nuevo.
      const { data, error } = await supabaseConexion.auth.signUp({
        email,
        password,
        //option.data se guarda en un perfil user_metadata.display_name no el la tabla propia del usuario.
        options: { data: { display_name } },
      });

      if (error) throw error;
      console.log(data);
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  const logout = async () => {
      await supabaseConexion.auth.signOut();
  };
//Controla el arranque de la sesión, no si la hay o no, si la hay devuelve el usuario, sino devuelve null.
  const getSesion = async () => {
    const { data } = await supabaseConexion.auth.getSession();
    return data.session?.user ?? null;
  };

  return { cargando, error, login, registro, logout, getSesion };
};

export default useSupabaseAuth;
