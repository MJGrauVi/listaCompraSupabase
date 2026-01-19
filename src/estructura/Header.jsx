import "./Header.css";
const Header = (props) => {
    return (
      <div className="contenedor-header">
        {props.children}
      </div>);
}
export default Header;