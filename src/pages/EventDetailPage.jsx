import { useParams } from "react-router-dom"
import service from "../service/config.service"
import { useContext, useEffect, useState } from "react"
import Error500 from "./Error500"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


function EventDetailPage () {
    
    const navigate = useNavigate()
    const params = useParams()
    // console.log(params)
    const { loggedUserId } = useContext(AuthContext)
    const [ eventDetail, setEventDetail ] = useState(null)
    const [ hasError, setHasError ] = useState(false)

    
    useEffect(() => {
        getData()
    }, [])
    
    const getData = async () => {
        try {
            const response = await service.get(`/events/${params.eventId}`)
            setEventDetail(response.data)
       
            console.log(response.data)
            
        } catch (error) {
            console.log(error)
            setHasError(true)
        }
    }

    const saveData = async () => {
        try {
            const response = await service.post(`/tickets`,eventDetail)
            console.log(response.data)
            navigate(`/profile/${loggedUserId}`)
        } catch (error) {
            console.log(error)
            setHasError(true)
        }
    }



    //simulacion de error
    // const getData = async () => {
    //     try {
    //         throw new Error("simulacion de error 500")
    //     } catch (error) {
    //         console.log(error)
    //         setHasError(true)
            
    //     }
    // }

    if(hasError) {
        return <Error500 />
      }
    

    if(eventDetail === null) {
        return <h3>Buscando detalles del evento...</h3>
      }

    return(
        <>
        
        <div key={eventDetail._id}>
        <img src={eventDetail.imageUrl} alt={eventDetail.name} style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
            <h2>{eventDetail.name}</h2> 
            <p>{eventDetail.genre}</p> 
            <p>{eventDetail.date}</p> 
            <p>{eventDetail.hour}</p> 
            <p>{eventDetail.location}</p>
            <p>{eventDetail.totalAmount}€</p> 
            <p>{eventDetail.info}</p> 
            <p> Created by: {eventDetail.admin.username}</p> 
        </div>

        <button onClick={saveData}>Comprar</button>
     
        </>
    )
}

export default EventDetailPage