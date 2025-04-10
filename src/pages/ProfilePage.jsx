import { useContext, useEffect, useState } from "react"
import service from "../service/config.service"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/auth.context"


function ProfilePage() {
    const { loggedUserId, isLoggedIn, username } = useContext(AuthContext)
    const [ user, setUser ] = useState(null)
    // const [ allEvents, setAllEvents ] = useState([])
    const [ allTickets, setAllTickets ] = useState([])


    useEffect(() => {
        if (!isLoggedIn){
            return
        }

        service.get(`/users/${loggedUserId}`)
        .then ((res) => {
            setUser(res.data)
        })
        .catch((error) => {
            console.log(error)
        })

        service.get(`/tickets/user/${loggedUserId}`)
    .then((response) => {
      console.log("recibiendo tickets", response.data)
      setAllTickets(response.data)
    })
    .catch((error) => {
      console.log(error)

    })
     }, [loggedUserId, username])

     const handleDelete = (ticketId) => {
        const confirmDelete = window.confirm("¿Seguro que quieres eliminar tu ticket?")
        if(!confirmDelete) {
          return 
        }
        
        service.delete(`/tickets/${ticketId}`)
        .then(() => {
         const updatedTickets = allTickets.filter((ticket) => ticket._id !== ticketId)
         setAllTickets(updatedTickets)
        })
        .catch((error) => {
          console.log(error)
        })
      }

     if(!user){

        return <h3>Cargando Perfil</h3>
     }

    return(
        <>
        <div>

            <h1>{user.username}</h1>
            
            <Link to="/editusername"> <button> Change username</button> </Link>

            <h1>Purchased tickets</h1>
            <ul>
                
                {allTickets.map((ticket) =>
                <div key={ticket._id}>
                <p><strong>Event</strong> {ticket.event.name}</p>
                <p><strong>Date</strong> {ticket.date}</p>
                <p><strong>Time</strong> {ticket.hour}</p>
                <p><strong>Owner</strong> {user.username}</p>
                <button onClick={() => handleDelete(ticket._id)}>Delete</button>
                </div>
                )}

            </ul>

        </div>
        </>
    )
}

export default ProfilePage