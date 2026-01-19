import "./Contenedor.css";

const Contenedor = (props) => {
    return (
      <div className="contenedor-pages">
        {props.children}
      </div>);
}
export default Contenedor;