INSERT INTO productos (nombre, peso, precio, imagen_url, descripcion) VALUES
(
  'Xiaomi Redmi Watch 5 Lite',
  26,
  39.99,
  'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_148917521?x=1800&y=1800&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=1800&ey=1800&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=1800&cdy=1800',
  'Smartwatch ligero con pantalla AMOLED, monitor de salud y más de 100 modos deportivos.'
),
(
  'HP 15s-fq2016na',
  90,
  59.00,
  'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08393073.png',
  'Tinta para impresora Officejet 970XL.'
),
(
  'Silla Ergonómica NIXON',
  5400,
  229.00,
  'https://www.ofisillas.es/images/product/1/large/pl_1_3_8115.jpg',
  'Silla ergonómica con soporte lumbar, color negro.'
),
(
  'Lenovo Tab M10 FHD Plus',
  460,
  179.00,
  'https://m.media-amazon.com/images/I/71pC69I3lzL._AC_SL1500_.jpg',
  'Tablet de 10.3 pulgadas Full HD ideal para multimedia y uso familiar.'
),
(
  'Sony WH-CH520',
  147,
  59.00,
  'https://m.media-amazon.com/images/I/610zLOuJmpL._AC_SL1500_.jpg',
  'Auriculares Bluetooth con 50 horas de batería y sonido equilibrado.'
);

//Eliminar
DELETE FROM productos WHERE nombre IN ( 'Xiaomi Redmi Watch 5 Lite', 'HP 15s-fq2016na', 'Silla Ergonómica NIXON', 'Lenovo Tab M10 FHD Plus', 'Sony WH-CH520' ) 
AND id NOT IN ( SELECT MIN(id) FROM productos GROUP BY nombre );
