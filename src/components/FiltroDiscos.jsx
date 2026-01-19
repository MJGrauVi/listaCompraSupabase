import "./FiltroDiscos.css";

const FiltroDiscos = ({ textoFiltro, onChange, onLimpiar }) => {
  return (
    <div className="controles-filtrado">
      <input
        type="text"
        value={textoFiltro}
        onChange={onChange}
        placeholder="Buscar por nombre, grupo o género..."
      />
      <button
        type="button"
        onClick={onLimpiar}
        disabled={!textoFiltro.trim()}
      >
        Limpiar
      </button>
    </div>
  );
};

export default FiltroDiscos;
