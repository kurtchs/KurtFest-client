import { useParams } from "react-router-dom"
import service from "../service/config.service"
import { useEffect, useState } from "react"

function EventDetailPage () {
    
    const params = useParams()
    // console.log(params)
    const [ eventDetail, setEventDetail ] = useState(null)

    
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
        }
    }
    if(eventDetail === null) {
        return <h3>Buscando detalles del evento...</h3>
      }

    return(
        <>
        <div key={eventDetail._id}>
            <h2>{eventDetail.name}</h2> 
            <p>{eventDetail.genre}</p> 
            <p>{eventDetail.date}</p> 
            <p>{eventDetail.location}</p>
            <p>{eventDetail.totalAmount}€</p> 
            <p>{eventDetail.info}</p> 
            <p> Created by: {eventDetail.admin.username}</p> 
        </div>

        <button>Comprar</button>
        </>
    )
}

export default EventDetailPage