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
  const pesoNumero = parseNumeroES(peso);
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
const validarListaCompra = ({ nombre_lista}) => {
  let errores = [];
  const regExpNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s\-.,()]{4,}$/;
 

  if (!nombre_lista || !regExpNombre.test(nombre_lista)) {
    errores.push(
      "El nombre es obligatorio y debe tener al menos 4 caracteres.",
    );
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
const parseNumeroES = (valor, valorPorDefecto = 0) => {
  if (typeof valor === "number") return valor;
  if (!valor) return valorPorDefecto;

  const numero = Number(
    valor
      .toString() //Aseguramos string.
      .replace(/\./g, "") //Eliminanos el .
      .replace(",", ".") //Reemplazamos la coma por . para decimales.
      .replace(/[^\d.-]/g, "") //Niego todo lo que no sea digito, punto o guion(para números negativos).
      .trim(),
  );
  return isNaN(numero) ? valorPorDefecto : numero;
};

//Damos formato
const formatearPrecio = (precio) => {
  const numero = parseNumeroES(precio); // ← LIMPIA PRIMERO
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
  const numero = parseFloat(valor.replace(/[^\d,.-]/g, "").replace(",", "."));

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
const calcularPrecioTotal = (items) => {
  const sumaTotal = 
  items.reduce((acc, item) => acc + item.productos.precio * item.cantidad, 0);
  return sumaTotal;
};

const calcularPesoTotal = (items)=>{
  const pesoTotal = items.reduce((acc, item)=> acc + item.productos.peso * item.cantidad, 0);
  return pesoTotal;
}
export {
  validarProducto,
  parsePrecio,
  calcularResumenProductos,
  formatearPrecio,
  formatearPeso,
  parseNumeroES,
  calcularPrecioTotal,
   calcularPesoTotal,
   validarListaCompra
};
