import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ProveedorSesion from "./context/ProveedorSesion.jsx";
import ProveedorProductos from "./context/ProveedorProductos.jsx";
import "./index.css";
import App from "./App.jsx";
import ProveedorListasCompra from "./context/ProveedorListasCompra.jsx";
import ProveedorListaProductos from "./context/ProveedorListaProductos.jsx";
import ProveedorPerfil from "./context/ProveedorPerfil.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProveedorSesion>
      <ProveedorPerfil>
        <ProveedorProductos>
          <ProveedorListasCompra>
            <ProveedorListaProductos>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ProveedorListaProductos>
          </ProveedorListasCompra>
        </ProveedorProductos>
      </ProveedorPerfil>
    </ProveedorSesion>
  </StrictMode>,
);
