import "./FiltroProductos.css";
import useSesion from "../hooks/useSesion.js";


const FiltroProductos = ({ textoFiltro, onChange, onLimpiar, productos}) => {
/*   const {productos, textoFiltro, onChange, onLimpiar} = use */
  const { usuario } = useSesion();
  
  console.log("FiltroProducto:Usuario", usuario);
  console.log("Producto a filtrat: ", productos);
  if (!usuario) return null;
  return (
    <div className="controles-filtrado">
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
