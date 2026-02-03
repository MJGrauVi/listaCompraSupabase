import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ProveedorSesion from "./context/ProveedorSesion.jsx";
import ProveedorProductos from "./context/ProveedorProductos.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProveedorSesion>
      <ProveedorProductos>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ProveedorProductos>
    </ProveedorSesion>
  </StrictMode>,
);
