import "./App.css";
import { Routes, Route } from "react-router";

// pages
import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"

//!PAGINA DE PRUEBA FUTURO EDIT ADMIN
import PrivatePageExample from "./pages/PrivatePageExample";

// components
import Navbar from "./components/Navbar"
import PrivatePage from "./components/PrivatePage";
import EventDetailPage from "./pages/EventDetailPage";
import EditEvent from "./components/EditEvent";
import AddEvent from "./components/AddEvent";
//!NO OLVIDES USAR EL PrivatePage en las páginas que no se pueden ver si no estas logeado como en la ruta home 

function App() {

  return (
    <div>
      <Navbar />

      <br />
      <hr />

      <Routes>
        
        <Route path="/" element={<PrivatePage> <HomePage /> </PrivatePage>} />
        <Route path="/:eventId" element={<EventDetailPage />} />
        <Route path="/editevent/:eventId" element={<EditEvent />} />
        <Route path="/addevent/" element={<AddEvent />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private-page-example" element={<PrivatePageExample />} />
        {/* error FE routes here... */}

      </Routes>
    </div>
  )
}

export default App
