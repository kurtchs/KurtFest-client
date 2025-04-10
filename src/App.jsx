import "./App.css";
import { Routes, Route } from "react-router";

// pages
import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import NotFoundPage from "./pages/NotFoundPage";
import AdminPage from "./pages/AdminPage";

//!PAGINA DE PRUEBA FUTURO EDIT ADMIN


// components
import Navbar from "./components/Navbar"
import PrivatePage from "./components/PrivatePage";
import EventDetailPage from "./pages/EventDetailPage";
import EditEvent from "./components/EditEvent";
import AddEvent from "./components/AddEvent";
import ProfilePage from "./pages/ProfilePage";
import EditUser from "./components/EditUser";
//!NO OLVIDES USAR EL PrivatePage en las páginas que no se pueden ver si no estas logeado como en la ruta home 

function App() {

  return (
    <div>
      <Navbar />

      <br />
      

      <Routes>
        
        <Route path="/" element={<PrivatePage> <HomePage /> </PrivatePage>} />
        <Route path="/detail/:eventId" element={<PrivatePage> <EventDetailPage /> </PrivatePage> } />
        <Route path="/editevent/:eventId" element={<PrivatePage> <EditEvent /> </PrivatePage> } />
        <Route path="/addevent/" element={ <PrivatePage> <AddEvent /> </PrivatePage>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminpage" element={<PrivatePage> <AdminPage /> </PrivatePage>} />
        <Route path="/profile/:userId" element={<PrivatePage> <ProfilePage /> </PrivatePage>} />
        <Route path="/editusername" element={<PrivatePage> <EditUser /> </PrivatePage> } />


        {/* error FE routes here... */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
      <footer style={{ marginTop: '50px', textAlign: 'center', padding: '20px', backgroundColor: 'black', color: 'white' }}>
      <p>© 2025 Kurt Chacón. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App
