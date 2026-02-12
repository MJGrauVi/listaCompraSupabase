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
  const pesoNumero = parsearValor(peso);
  if (!pesoNumero || pesoNumero <= 0) {
    errores.push("El peso es obligatorio y debe ser un número válido.");
  }
  const precioNumero = parsearValor(precio);
  if (!precioNumero || precioNumero <= 0) {
    errores.push("El precio debe tener un formato válido.");
  }
  if (!descripcion || descripcion.trim().length < 10) {
    errores.descripcion = "La descripción debe tener al menos 10 caracteres.";
  }

  return errores;
};
const validarListaCompra = ({ nombre_lista }) => {
  let errores = [];
  const regExpNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s\-.,()]{4,}$/;

  if (!nombre_lista || !regExpNombre.test(nombre_lista)) {
    errores.push(
      "El nombre es obligatorio y debe tener al menos 4 caracteres.",
    );
  }

  return errores;
};
/***************************************************************** */
//1.-Convertimos el texto (valor) a número.
const parsearValor = (valor) => {
  if (typeof valor === "number") return valor; //solución clave.
  if (!valor) return null;
  valor = valor.replace(/\s|€|gr/gi, ""); // Eliminar espacios y símbolos € y gr.
  valor = valor.replace(/\./g, ""); // Quitar puntos de miles.
  valor = valor.replace(/,/g, "."); // Cambiar coma decimal por punto.
  return parseFloat(valor); // Convertir a número.
};
//2.-Formatear número a texto.
const formatearValor = (valor, decimales = 2) => {
  return valor.toLocaleString("es-ES", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
};
//3.-Formatear según el tipo.(llega numero).
const formatoSegunTipo = (valor, tipo) =>{
  let numero = parsearValor(valor);
  if(tipo === "peso"){
    numero = Math.round(numero);//sin decimales.
    return formatearValor(numero, 0) + " gr.";
  }
  if (tipo === "precio"){
    return formatearValor(numero, 2) + " €";
  }
  return valor;
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
        ).toLocaleString("es-ES", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : 0;

  return {
    cantidad,
    precioMedio,
  };
};
const calcularPrecioTotal = (items=[]) => {
  const sumaTotal = items.reduce(
    (acc, item) => acc + item.productos.precio * item.cantidad,
    0,
  );
  return sumaTotal;
};

const calcularPesoTotal = (items=[]) => {
  const pesoTotal = items.reduce(
    (acc, item) => acc + item.productos.peso * item.cantidad,
    0,
  );
  return pesoTotal;
};

export {
  validarProducto,
  calcularResumenProductos,
  calcularPrecioTotal,
  calcularPesoTotal,
  validarListaCompra,
  parsearValor,
  formatearValor,
  formatoSegunTipo

};
