import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const { authenticateUser, isLoggedIn } = useContext(AuthContext)
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

  return (
    <nav>

    {isLoggedIn === true ?
    <>
    <Link to="/">Home</Link>
    <Link onClick={handleLogout}>Cerrar sesión</Link>
    
    </>
    :
    <>
    {/* <Link to="/login">Login</Link> */}
    </>
    }

      {/* <Link to="/signup">Registro</Link> */}
      {/* <Link to="/private-page-example">Prueba Privado</Link> */}
    </nav>
  );
}

export default Navbar;
