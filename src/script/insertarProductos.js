import { supabaseConexion } from "./supabase/supabase.js";

const productos = [
  {
    nombre: "Xiaomi Redmi Watch 5 Lite",
    peso: 26,
    precio: 39.99,
    imagen_url: "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_148917521?x=1800&y=1800&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=1800&ey=1800&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=1800&cdy=1800",
    descripcion: "Smartwatch ligero con pantalla AMOLED, monitor de salud y más de 100 modos deportivos."
  },
  {
    nombre: "HP 15s-fq2016na",
    peso: 90,
    precio: 59.00,
    imagen_url: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08393073.png",
    descripcion: "Tinta para impresora Officejet 970XL."
  },
  {
    nombre: "Silla Ergonómica NIXON",
    peso: 5400,
    precio: 229.00,
    imagen_url: "https://www.ofisillas.es/images/product/1/large/pl_1_3_8115.jpg",
    descripcion: "Silla ergonómica con soporte lumbar, color negro."
  },
  {
    nombre: "Lenovo Tab M10 FHD Plus",
    peso: 460,
    precio: 179.00,
    imagen_url: "https://m.media-amazon.com/images/I/71pC69I3lzL._AC_SL1500_.jpg",
    descripcion: "Tablet de 10.3 pulgadas Full HD ideal para multimedia y uso familiar."
  },
  {
    nombre: "Sony WH-CH520",
    peso: 147,
    precio: 59.00,
    imagen_url: "https://m.media-amazon.com/images/I/610zLOuJmpL._AC_SL1500_.jpg",
    descripcion: "Auriculares Bluetooth con 50 horas de batería y sonido equilibrado."
  }
];

async function insertar() {
  const { data, error } = await supabaseConexion
    .from("productos")
    .insert(productos);

  console.log("Resultado:", data, error);
}

insertar();
