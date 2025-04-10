import { useContext, useEffect, useState } from "react"
import service from "../service/config.service"
import SearchBar from "../components/SearchBar"
import { Link, useParams } from "react-router-dom"
import Error500 from "./Error500"
import { AuthContext } from "../context/auth.context"
function Home() {

  const { userRole } = useContext(AuthContext)

  console.log(userRole)
  const params = useParams()
  const [ allEvents, setAllEvents ] = useState(null)
  const [ searchBar, setSearchBar ] = useState("")
  const [ hasError, setHasError ] = useState(false)

  useEffect(() => {

    service.get("/events")
    .then((response) => {
      console.log("recibiendo info", response.data)
      setAllEvents(response.data)
    })
    .catch((error) => {
      console.log(error)
      setHasError(true)
    })

  }, [])

  if(hasError) {
    return <Error500 />
  }

  if(allEvents === null) {
    return <h3>Buscando eventos...</h3>
  }
  
  const filteredEvents = allEvents.filter(function (event){
    return event.name.toLowerCase().includes(searchBar.toLowerCase())
  })

  const handleDelete = (eventId) => {
    const confirmDelete = window.confirm("¿Seguro que quieres eliminar este evento?")
    if(!confirmDelete) {
      return 
    }
    service.delete(`events/${eventId}`)
    .then(() => {
      console.log("Evento eliminado")
     const updatedEvents = allEvents.filter((event) => event._id !== eventId)
     setAllEvents(updatedEvents)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

      <SearchBar searchBar={searchBar} setSearchBar={setSearchBar} />
      <h1>Events</h1>

      {userRole === "admin" ? (

        <Link to={"/addevent/"}> <button>Create Event</button> </Link>

      ) : (
        ""
      )}

     {filteredEvents.map((eachEvent) => {
      return(
        <div key ={eachEvent._id}>
        
        <Link to={`/detail/${eachEvent._id}`} key ={eachEvent._id} >
        <div  style={{
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          border: "solid black", 
          margin: 20, 
          width: 300, 
          height: 450, 
          borderRadius: "20px",
          padding: "10px",
        }}>
        <img src={eachEvent.imageUrl} alt={`Picture ${eachEvent.name}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }}  />
        <h2>{eachEvent.name}</h2> 
        <h3>{eachEvent.date}</h3> 
        <h3>{eachEvent.location}</h3>
        <h3>{eachEvent.totalAmount}€</h3>  
        </div>
        </Link>

        <div>

          {userRole === "admin" ? (
            <>
            <Link to={`/editevent/${eachEvent._id}`}>
         <button>Edit</button> 
         </Link>
         <button onClick={() => handleDelete(eachEvent._id)}>Delete</button>
            </>
          ) : 
          null
          }
         
        </div>

        </div>
      )
      })} 
      
    </div>
  )
}

export default Home