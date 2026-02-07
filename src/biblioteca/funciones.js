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
  if (!valor) return 0; // 1. Quitar "g", espacios y cualquier letra.
  let limpio = valor.replace(/[^\d,.-]/g, ""); // 2. Quitar separadores de miles
  limpio = limpio.replace(/\./g, ""); // 3. Convertir coma en punto
  limpio = limpio.replace(",", "."); // 4. Convertir a número real
  return Number(limpio);
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
const formatearPeso = (valor) => {
  if (!valor) return ""; // Convertimos a número REAL usando parsePeso.
  const numero = parsePeso(valor); // Si no es número, no formateamos.
  if (isNaN(numero)) return valor; // Formateamos con miles y dos decimales.
  //Redondear a 2 decimales SIEMPRE.
  const fijo = Number(numero.toFixed(2));
  return fijo.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " gr.";
};

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
