import { useNavigate } from "react-router-dom";
import service from "../service/config.service";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

function EditUser() {
    const { username, loggedUserId, authenticateUser } = useContext(AuthContext)
    const [ newUsername, setNewUsername ] = useState(username)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        await service.patch(`/users/${loggedUserId}`, {
            username: newUsername
        })

        await authenticateUser()

        navigate(`/profile/${loggedUserId}`)
    }


    return(
        <>
        <div>

        <h2>Edit username</h2>
        <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={newUsername}
        placeholder="New name"
        onChange={(e) => setNewUsername(e.target.value)}
        />
        <button type="submit">Actualizar</button>
        </form>

        </div>
        </>
    )
    
}

export default EditUser