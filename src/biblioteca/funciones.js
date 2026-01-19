"use strict";
 const validarDisco = ({ nombreDisco, tipoGrupo, grupo, genero, lanzamiento, localizacion }) => {
    let errores = [];
    const regExp = /^[A-Za-z\s]{4,}$/;
    const localizaRegExp = /^ES-\d{3}[A-Z]{2}$/;
    const anioRegExp = /^\d{4}$/;
    
    if (!nombreDisco || !regExp.test(nombreDisco)) {
        errores.push("El nombre es obligatorio y debe tener al menos 4 caracteres.");
    }
   /*   if (url_caratula) {
        errores.push("La carátula no es obligatorio.");
    } */
   
    if (!tipoGrupo || tipoGrupo.length < 4) {
        errores.push("El tipo de Grupo es obligatorio y debe tener al menos 4 caracteres.");
    }
    if (!grupo || grupo.length < 4) {
        errores.push("El nombre del grupo o solista es obligatorio y debe tener al menos 4 caracteres.");
    }
    if (!genero) {
        errores.push("El género es obligatoriooooooo.");
    }
    if (!lanzamiento || !anioRegExp.test(lanzamiento)) {
        errores.push("El año de lanzamiento es obligatorio.");
    }
    if (!localizacion || !localizaRegExp.test(localizacion.toUpperCase())) {
        errores.push("La localización es obligatoria y debe cumplir el patron (ES-111AA).");
    }
    return errores;

} 

export { validarDisco};