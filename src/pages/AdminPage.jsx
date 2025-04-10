import { AuthContext } from "../context/auth.context"
import service from "../service/config.service"
import { useContext, useEffect, useState } from 'react'

function AdminPage() {
const [ users, setUsers ] = useState([])
  

  useEffect(() => {
    service.get("/users")
    .then((res) => {
      setUsers(res.data)
    })
    .catch((error) => {
      console.log("Error en conseguir la lista de usuarios", error)
    })
  }, [])

  

  const handleDelete =  async (userId) => {
    const confirmDelete = window.confirm("¿Seguro que quieres eliminar a este usuario?")
    if(confirmDelete) {
      try{
        const response = await service.delete(`/users/${userId}`)
        console.log("Usuario borrado", response)
        setUsers(users.filter(user => user._id !== userId))
      } catch (error) {
      console.log(error)
    }
  }
}
    

 

  return (
    <div>
      
      <h1>Usuarios registrados</h1>

      {users.map((user) => (
        <div key={user._id}>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <button onClick={() => handleDelete(user._id)} >Banear usuario</button>
          <hr />
          </div>
      ))}
    </div>
  )
}

export default AdminPage