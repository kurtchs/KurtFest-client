import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { authenticateUser, isLoggedIn, userRole, username } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken");

      await authenticateUser();

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      <div>
      {isLoggedIn === true ? (
        <Link to="/">Home</Link>
      ) : null}
        </div>

        <div className="nav-right">
        {isLoggedIn === true ? (
          <>
       <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
       ☰
     </button>
     {menuOpen ? (
      <div className="dropdown">
        <Link to={`/profile/${username}`}>{username}</Link>
        <Link onClick={handleLogout}>Cerrar sesión</Link>
        {userRole === "admin" ? (
          <Link to="/adminpage">Perfil Admin</Link>
        ) : null}
      </div>
    ) : null}
  </>
) : null}
</div>
</nav>
  );
}

export default Navbar;
