import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/signup">Registro</Link>
      <Link to="/login">Acceso</Link>
      <Link to="/private-page-example">Ejemplo Privado</Link>
      <Link>Cerrar sesión</Link>
    </nav>
  );
}

export default Navbar;
