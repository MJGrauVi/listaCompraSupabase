import { createContext, useEffect, useState } from "react";
import { supabaseConexion } from "../supabase/supabase.js";

const ContextoSesion = createContext();

const ProveedorSesion = ({ children }) => {
 
 //Supabase devualve null cuando no hay usuario, por lo tanto el estado a null.
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const datosSesionInicial = {
      email: "", 
      password:"",
      displa_name: "",
    }
  const limpiarDatosSesion = ()=>{
    setDatosSesion(datosSesionInicial)
  }
  const [datosSesion, setDatosSesion] = useState(datosSesionInicial);


  useEffect(() => {
    // Sesión inicial, con getSesion para arrancar.
    supabaseConexion.auth.getSession().then(({ data }) => {
      setUsuario(data.session?.user ?? null);
      setLoading(false);
      
    });

    // Listener de cambios de sesión.
    const { data: listener } =
      supabaseConexion.auth.onAuthStateChange((_event, session) => {
        setUsuario(session?.user ?? null);
      });

    return () => listener.subscription.unsubscribe();
  }, []);

  const actualizarDatos = (e) => {
    const { name, value } = e.target;
    setDatosSesion({ ...datosSesion, [name]: value });
  };


  const login = async () => {
    const { data, error } = await supabaseConexion.auth.signInWithPassword({
      email: datosSesion.email,
      password: datosSesion.password,
    });
    if (error) {
      console.error("Error login:", error.message);
    }
  return { data, error };
};


  const registro = async () => {
    const {data, error} = await supabaseConexion.auth.signUp({
      email: datosSesion.email,
      password: datosSesion.password,
      options: {
        data: {
          display_name: datosSesion.display_name,
        },
      },
    });
    if(error){
      console.log("Error:", error.message)
    }else{
      console.log("Usuario creado: ", data)
    }
  };

  const logout = async () => {
    await supabaseConexion.auth.signOut();
    limpiarDatosSesion();
  };

  return (
    <ContextoSesion.Provider
      value={{
        usuario,
        loading,
        datosSesion,
        actualizarDatos,
        login,
        registro,
        logout,
        limpiarDatosSesion
      
      }}
    >
      {children}
    </ContextoSesion.Provider>
  );
};

export default ProveedorSesion;
export { ContextoSesion };
