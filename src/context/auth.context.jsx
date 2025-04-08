import service from "../service/config.service"
import { createContext, useContext, useEffect, useState } from "react"


//contexto = comparte los estados por la app
const AuthContext = createContext()

//wrapper = el que envuelve a la app y crea los estados
function AuthWrapper(props) {

    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ loggedUserId, setLoggedUserId ] = useState(null)
    const [ userRole, setUserRole ] = useState(null)
    const [ isAuthenticatingUser, setIsAuthenticatingUser ] = useState(true) 

    useEffect(() => {
        authenticateUser()
    }, [])

    async function authenticateUser() {

        try {
            
            

            //recuerda axios se esta realizando en la configuracion del service y el toque tambien esta configurado ahi
            const response = await service.get(`/auth/verify`)

            // console.log(response)
            setIsLoggedIn(true)
            setLoggedUserId(response.data.payload._id)
            setUserRole(response.data.payload.role)
            setIsAuthenticatingUser(false)

        } catch (error) {

            console.log(error)
            setIsLoggedIn(false)
            setLoggedUserId(null)
            setUserRole(null)
            setIsAuthenticatingUser(false)
        }

    }

    const passedContext = {
        isLoggedIn,
        loggedUserId,
        userRole,
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