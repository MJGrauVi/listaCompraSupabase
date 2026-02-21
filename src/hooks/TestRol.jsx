import { useEffect } from "react";
import useSupabaseAuth from "../hooks/useSupabaseAuth";

export default function TestRol() {
  const { getRol } = useSupabaseAuth();

  useEffect(() => {
    const probar = async () => {
      const rol = await getRol("ee60bf1e-94ff-40eb-8c8c-482fd9f77198");
      console.log("TEST getRol:", rol);
    };
    probar();
  }, []);

  return <p>Probando rol...</p>;
}
