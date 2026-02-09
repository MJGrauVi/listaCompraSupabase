"use strict";
const validarProducto = ({ nombre, peso, precio, descripcion }) => {
  let errores = [];
  const regExpNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s\-.,()]{4,}$/;
  /*   const regExpPeso = /^\d+([.,]\d+)?$/;
  const regExpPrecio = /^\d{1,3}(\.\d{3})*(,\d{2})(\s?€)?$/; */

  if (!nombre || !regExpNombre.test(nombre)) {
    errores.push(
      "El nombre es obligatorio y debe tener al menos 4 caracteres.",
    );
  }
  const pesoNumero = parsePeso(peso);
  if (!pesoNumero || pesoNumero <= 0) {
    errores.push("El peso es obligatorio y debe ser un número válido.");
  }
  const precioNumero = parsePrecio(precio);
  if (!precioNumero || precioNumero <= 0) {
    errores.push("El precio debe tener un formato válido.");
  }
  if (!descripcion || descripcion.trim().length < 10) {
    errores.descripcion = "La descripción debe tener al menos 10 caracteres.";
  }

  return errores;
};
//Parseamo para guardar en bbdd.
const parsePrecio = (precio) => {
  if (typeof precio === "number") return precio;
  if (!precio) return 0;
  return Number(
    precio
      .replace(/\./g, "") // Quitar separadores de miles.
      .replace(",", ".") // Cambiar coma por punto.
      .replace(/[^\d,.-]/g, "") // Quitar símbolo € y letras.
      .trim(),
  );
};

//Parseamos el peso.
const parsePeso = (valor) => {
  if (typeof valor === "number") return valor;
  if (!valor) return 0; 
  let limpio = valor.replace(/[^\d,.-]/g, ""); // 1. Quitar "g", espacios y cualquier letra.
  limpio = limpio.replace(/\./g, ""); // 2. Quitar separadores de miles
  limpio = limpio.replace(",", "."); // 3. Convertir coma en punto
  return Number(limpio);// 4. Convertir a número real
};

//Damos formato
const formatearPrecio = (precio) => {
  const numero = parsePrecio(precio); // ← LIMPIA PRIMERO
  return numero.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

//Formato para peso. Limpia el input y retorna formato 1.000 gr.
function formatearPeso(valor) {
  if (!valor) return "";

  // Quitamos todo lo que no sea número o coma/punto
  const numero = parseFloat(
    valor
      .replace(/[^\d,.-]/g, "")
      .replace(",", ".")
  );

  if (isNaN(numero)) return "";

  return `${numero.toLocaleString("es-ES")} gr.`;
}

const calcularResumenProductos = (productos) => {
  //.length nos da la cantidad de productos.
  const cantidad = productos.length;

  //Acumulados en total el precio de cada producto si lo tiene, sino toma 0 como valor.
  //Formateamos con 2 decimales.
  const precioMedio =
    cantidad > 0
      ? (
          productos.reduce((total, p) => total + Number(p.precio || 0), 0) /
          cantidad
        ).toFixed(2)
      : 0;

  return {
    cantidad,
    precioMedio,
    formatearPeso,
  };
};

export {
  validarProducto,
  parsePrecio,
  calcularResumenProductos,
  formatearPrecio,
  formatearPeso,
  parsePeso,
};
