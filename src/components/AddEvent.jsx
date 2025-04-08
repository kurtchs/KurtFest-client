import { useNavigate, useParams } from "react-router-dom"
import service from "../service/config.service"
import { useEffect, useState } from "react"

function AddEvent () {

    const navigate = useNavigate()

const [ name, setName ] = useState("")
const [ info, setInfo ] = useState("")
const [ date, setDate ] = useState("")
const [ hour, setHour ] = useState("")
const [ location, setLocation ] = useState("")
const [ totalAmount, setTotalAmount ] = useState("")
const [ genre, setGenre ] = useState("")
const [ file, setFile] = useState(null)

const handleFileChange = (e) => {
    setFile(e.target.files[0])
}

const handleSubmit =  async (e) => {
    e.preventDefault()

    const formData = new FormData()
        formData.append("name", name)
        formData.append("info", info)
        formData.append("date", date)
        formData.append("hour", hour)
        formData.append("location", location)
        formData.append("totalAmount", totalAmount)
        formData.append("genre", genre)
        if (file) {
            formData.append("image", file)
        }

        try {
            const response = await service.post("/events/addevent/", formData, {
        
                headers: {
                    "Content-Type": "multipart/form-data"
                }
                // name: name,
                // info: info,
                // date: date,
                // hour: hour,
                // location: location,
                // totalAmount: totalAmount,
                // genre: genre,
              
            })

            if (response.status === 200) {
                console.log("Evento creado con éxito");
                navigate("/")
            } else {
                console.log("Error al crear evento")
            }
            
        } catch (error) {
            console.log(error)
        }

    

}


    return(

    <>
    <div>
        <h1>Crea tu evento</h1>

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

          <div>
            <input
              onChange={handleFileChange}
              type="file"
              name="image"
              accept="image/*"
            />
          </div>

         <button type="submit">Crear</button>

          </form>
    </div>
    </>


    )
}

export default AddEvent