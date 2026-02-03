import "./FiltroProductos.css";

const FiltroProductos = ({ textoFiltro, onChange, onLimpiar }) => {
  return (
    <div className="controles-filtrado">
      <input
        type="text"
        value={textoFiltro}
        onChange={onChange}
        placeholder="Buscar por nombre, precio o peso..."
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

export default FiltroProductos;
