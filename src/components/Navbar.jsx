import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const [ loggedUserId, setLoggedUserId ] = useState(null)
  const { authenticateUser, isLoggedIn, userRole, username } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {

    try {

      localStorage.removeItem("authToken")

      await authenticateUser()

      navigate("/login")
      
    } catch (error) {
      console.log(error)
    }

  }
  console.log(isLoggedIn)
  console.log(username)

  return (
    <nav>

    {isLoggedIn === true ?
    <>
    <Link to="/">Home</Link>
    <Link onClick={handleLogout}>Cerrar sesión</Link>
    <Link to={`/profile/${username}`}>{username}</Link>
    
    </>
    :
    <>
    {/* <Link to="/login">Login</Link> */}
    </>
    }

      {/* <Link to="/signup">Registro</Link> */}

      {userRole === "admin" ?
      <Link to="/private-page-example">Perfil Admin</Link>

      :

      null
      
    }
    </nav>
  );
}

export default Navbar;
