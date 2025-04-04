import { useNavigate, useParams } from "react-router-dom";
import service from "../service/config.service";
import { useEffect, useState } from "react";

function EditEvent() {
  const navigate = useNavigate();
  const params = useParams()

  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [location, setLocation] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [genre, setGenre] = useState("");

    // useEffect(() => {

    //    service.get(`events/${params.eventId}`)
    //    .then((response) => {
    //     console.log(params.eventId)
    //     console.log(response)
    //     setName(response.data.name)
    //     setInfo(response.data.info)
    //     setDate(response.data.date)
    //     setHour(response.data.hour)
    //     setLocation(response.data.location)
    //     setTotalAmount(response.data.totalAmount)
    //     setGenre(response.data.genre)
    //    })
    //    .catch((error) => {
    //     console.log(error)
    //    }) 

    // }, [])

    useEffect(() => {
        getEvent()
    }, [])

    const getEvent = async () => {
        try {
            const response = await service.get(`/events/${params.eventId}`)
            setName(response.data.name)
            setInfo(response.data.info)
            setDate(response.data.date)
            setHour(response.data.hour)
            setLocation(response.data.location)
            setTotalAmount(response.data.totalAmount)
            setGenre(response.data.genre)

            console.log(response.data)

            
        } catch (error) {
            console.log(error)
        }
    }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("datos enviados",{
        name: name,
        info: info,
        date: date,
        hour: hour,
        location: location,
        totalAmount: totalAmount,
        genre: genre,
    } )
    try {
       const response = await service.put(`/events/editevent/${params.eventId}`, {
            
            name,
            info,
            date,
            hour,
            location,
            totalAmount,
            genre,
        })
        
        console.log("evento editado")
        // setName(response.data.name)
        // setInfo(response.data.info)
        // setDate(response.data.date)
        // setHour(response.data.hour)
        // setLocation(response.data.location)
        //     setTotalAmount(response.data.totalAmount)
        //     setGenre(response.data.genre)
        navigate("/");
    } catch (error) {
        console.log("evento no editado", error)
    }
  };

  const handleDelete = (e) => {
    service.delete(`events/${params.eventId}`)
    .then(() => {
      console.log("Evento eliminado")
      navigate("/");
    })
    .catch((error) => {
      console.log(error)
    })
  }


  return (
    <>
      <div>
        <h1>Edita tu evento</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="name"
              placeholder="Event`s Name"
            />
          </div>

          <div>
            <input
              onChange={(e) => setInfo(e.target.value)}
              value={info}
              type="text"
              name="info"
              placeholder="Event`s Description"
            />
          </div>

          <div>
            <input
              onChange={(e) => setDate(e.target.value)}
              value={date}
              type="text"
              name="date"
              placeholder="Event`s Date"
            />
          </div>

          <div>
            <input
              onChange={(e) => setHour(e.target.value)}
              value={hour}
              type="time"
              name="hour"
              placeholder="Event`s Hour"
            />
          </div>

          <div>
            <input
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              type="text"
              name="location"
              placeholder="Event`s Location"
            />
          </div>

          <div>
            <input
              onChange={(e) => setTotalAmount(e.target.value)}
              value={totalAmount}
              type="number"
              name="totalAmount"
              placeholder="Event`s Amount"
            />
          </div>

          <div>
            <input
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
              type="text"
              name="genre"
              placeholder="Event`s Genre"
            />
          </div>

          <button type="submit">Editar</button>
          <button onClick={handleDelete}>Delete</button>
        </form>
      </div>
    </>
  );
}

export default EditEvent;
