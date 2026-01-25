import "./Inicio.css";

/* ----------- Presentación de la aplicación  ------------------- */
const Inicio = () => {
  return (
    <div className="contenedor-inicio">
      <h1>Mi lista de la compra</h1>

      <div className="presentacion">
        <p className="descripcion">
          Aplicación con React y Supabase.
        </p>
      </div>
    </div>
  );
};

export default Inicio;
