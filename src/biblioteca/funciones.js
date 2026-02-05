"use strict";
const validarProducto = ({ nombre, peso, precio, descripcion }) => {
  let errores = [];
  const regExp = /^[A-Za-z\s]{4,}$/;
  const regExpPeso = /^\d+([.,]\d+)?$/;
  const regExpPrecio = /^\d{1,3}(\.\d{3})*(,\d{2})\s?€$/;

  if (!nombre || !regExp.test(nombre)) {
    errores.push(
      "El nombre es obligatorio y debe tener al menos 4 caracteres.",
    );
  }

  if (!peso || regExpPeso.test(peso)) {
    errores.push("El peso es obligatorio, introduzca su valor.");
  }
  if (!precio || regExpPrecio.test(precio)) {
    errores.push(
      "Introduzca el valor del producto, debe tener formato 1.000,00 €.",
    );
  }
  if (!descripcion || descripcion.trim().length < 10) {
    errores.descripcion = "La descripción debe tener al menos 10 caracteres.";
  }

  return errores;
};
const parsePrecio = (precio) => {
  return Number(
    precio
      .replace(/\./g, "") // quitar separadores de miles
      .replace(",", ".") // cambiar coma por punto
      .replace("€", "") // quitar símbolo €
      .trim(),
  );
};

const calcularResumenProductos = (productos) => {
  const cantidad = productos.length;

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
  };
};

export { validarProducto, parsePrecio, calcularResumenProductos };
