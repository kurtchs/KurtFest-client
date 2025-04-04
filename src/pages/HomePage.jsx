import { useEffect, useState } from "react"
import service from "../service/config.service"
import SearchBar from "../components/SearchBar"
import { Link } from "react-router-dom"
function Home() {
  const [ allEvents, setAllEvents ] = useState(null)
  const [ searchBar, setSearchBar ] = useState("")

  useEffect(() => {

    service.get("/events")
    .then((response) => {
      console.log("recibiendo info", response.data)
      setAllEvents(response.data)
    })
    .catch((error) => {
      console.log(error)
    })

  }, [])

  if(allEvents === null) {
    return <h3>Buscando eventos...</h3>
  }
  
  const filteredEvents = allEvents.filter(function (event){
    return event.name.toLowerCase().includes(searchBar.toLowerCase())
  })
  
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

      <SearchBar searchBar={searchBar} setSearchBar={setSearchBar} />
      <h1>Events</h1>
      <Link to={"/addevent/"}> <button>Create Event</button> </Link>

     {filteredEvents.map((eachEvent) => {
      return(
        <>
        
        <Link to={`/${eachEvent._id}`} key ={eachEvent._id} >
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
        <h2>{eachEvent.name}</h2> 
        <h3>{eachEvent.date}</h3> 
        <h3>{eachEvent.location}</h3>
        <h3>{eachEvent.totalAmount}€</h3>  
        </div>
        </Link>

        <div>
          <Link to={`/editevent/${eachEvent._id}`}>
         <button>Edit</button> 
         </Link>
         <button>Delete</button>
        </div>

        </>
      )
      })} 
      
    </div>
  )
}

export default Home