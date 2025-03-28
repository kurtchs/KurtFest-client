import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"


//contexto = comparte los estados por la app
const AuthContext = createContext()

//wrapper = el que envuelve a la app y crea los estados
function AuthWrapper(props) {

    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ loggedUserId, setLoggedUserId ] = useState(null)
    const [ isAuthenticatingUser, setIsAuthenticatingUser ] = useState(true) 

    useEffect(() => {
        authenticateUser()
    }, [])

    async function authenticateUser() {

        try {
            
            const authToken = localStorage.getItem("authToken")

            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify`, {
                headers:{
                    authorization: `Bearer ${authToken}`
                }
            })

            console.log(response)
            setIsLoggedIn(true)
            setLoggedUserId(response.data.payload._id)
            setIsAuthenticatingUser(false)

        } catch (error) {

            console.log(error)
            setIsLoggedIn(false)
            setLoggedUserId(null)
            setIsAuthenticatingUser(false)
        }

    }

    const passedContext = {
        isLoggedIn,
        loggedUserId,
        authenticateUser
    }

    if(isAuthenticatingUser === true) {
        return <h3>validando</h3>

        //TODO SPINNER!!!!
    }

    return(
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )
}



export {
    AuthWrapper,
    AuthContext
}