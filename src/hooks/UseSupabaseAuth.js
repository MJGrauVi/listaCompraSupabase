import { useState } from "react";
import { supabaseConexion } from "../supabase/supabase.js";

const useSupabaseAuth = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  //Pasamos los datos por parametro para no depender de un estado.
  const login = async (email, password) => {
    setCargando(true);
    setError(null);

    try {
      const { data, error } =
        await supabaseConexion.auth.signInWithPassword({
          email,
          password,
        });

      if (error) throw error;
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  const registro = async (email, password, display_name) => {
    setCargando(true);
    setError(null);

    try {
      const { data, error } = await supabaseConexion.auth.signUp({
        email,
        password,
        options: {
          data: { display_name },
        },
      });

      if (error) throw error;
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  const logout = async () => {
    setCargando(true);
    setError(null);

    try {
      await supabaseConexion.auth.signOut();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  const getSesion = async () => {
    const { data } = await supabaseConexion.auth.getSession();
    return data.session?.user ?? null;
  };

  return {
    cargando,
    error,
    login,
    registro,
    logout,
    getSesion,
  };
};

export default useSupabaseAuth;
