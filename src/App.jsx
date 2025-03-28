import "./App.css";
import { Routes, Route } from "react-router";

// pages
import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"

// import PrivatePageExample from "./pages/PrivatePageExample";

// components
import Navbar from "./components/Navbar"
import PrivatePage from "./components/PrivatePage";
//!NO OLVIDES USAR EL PrivatePage en las páginas que no se pueden ver si no estas logeado como en la ruta home 

function App() {

  return (
    <div>
      <Navbar />

      <br />
      <hr />

      <Routes>
        <Route path="/" element={<PrivatePage> <HomePage /> </PrivatePage>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* error FE routes here... */}

      </Routes>
    </div>
  )
}

export default App
