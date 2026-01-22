import React from 'react'

const CrearCuentaUsuario = () => {
  return (
    <div className="cuentaUsuario">
        <h2>Crear Cuenta Usuario</h2>
        <form action="submit">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" name="email" id="email" placeholder="nombreUsuario@...." 
            onChange={(e)=>{
                
            }}/>
        </form>
      
    </div>
  )
}

export default CrearCuentaUsuario;
