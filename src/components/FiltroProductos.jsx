import "./FiltroProductos.css";

const FiltroProductos = ({ textoFiltro, onChange, onLimpiar}) => {

  return (
    <div className="filtrado-contenedor">
      <div className="controles-filtrado">
        <label htmlFor="filtro">Filtrar productos por: </label>
        <input
          type="text"
          value={textoFiltro}
          onChange={onChange}
          placeholder="nombre, precio o peso..."
        />
      </div>
      <div>
        <button
          type="button"
          onClick={onLimpiar}
          disabled={!textoFiltro.trim()}
        >
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default FiltroProductos;
