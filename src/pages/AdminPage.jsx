import service from "../service/config.service"
import { useEffect, useState } from 'react'

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
        setUsers(users.filter(user => user._id !== userId))
      } catch (error) {
      console.log(error)
    }
  }
}
    

 

  return (
    <div className="admin-page">
      
      <h1>Usuarios registrados</h1>

      {users.map((user) => (
        <div className="user-card" key={user._id}>
          <p className="user-name">{user.username}</p>
          <p className="user-email">{user.email}</p>
          <button className="ban-button" onClick={() => handleDelete(user._id)} >Banear usuario</button>
          </div>
      ))}
    </div>
  )
}

export default AdminPage