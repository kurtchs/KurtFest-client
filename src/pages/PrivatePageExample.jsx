import { AuthContext } from "../context/auth.context"
import service from "../service/config.service"
import { useContext, useEffect, useState } from 'react'

function PrivatePageExample() {

  

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      
      // call a private route here...

    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteAdmin = async () => {

    try {
      
      const response = await service.delete("/auth/private-page-example")
      console.log(response)

    } catch (error) {
      console.log(error)
    }

  }

  // loading handler here

  return (
    <div>
      
      <h3>Ejemplo de página privada</h3>
      <p>Solo usuarios que hayan validado credenciales deberian poder acceder y ver la siguiente información:</p>

      <button onClick={handleDeleteAdmin} >Borrar(admin)</button>

    </div>
  )
}

export default PrivatePageExample