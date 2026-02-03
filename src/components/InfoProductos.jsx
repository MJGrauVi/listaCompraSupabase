const InfoProductos = ({ total, visibles, filtro })=>{
  return (
    <p>
      Mostrando {visibles} de {total}
      {filtro && ` (filtrado por "${filtro}")`}
    </p>
  );
}
export default InfoProductos;