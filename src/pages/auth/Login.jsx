import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function Login() {

  const { authenticateUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {
      
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
        email: email,
        password: password
      })

      console.log("Usuario logeado", response)

      localStorage.setItem("authToken", response.data.authToken)

      await authenticateUser()


      navigate("/")

    } catch (error) {
      console.log(error)
      if(error.response && error.response.status === 400) {
        console.log(error.response.status)
        console.log(error.response.errorMessage)
        setErrorMessage(error.response.data.errorMessage)
      } else {

        //TODO hacer un navigate al /error        

      }
      
    }

  };

  const handleCreateAccount = () => {
    navigate("/signup")
  }

  return (
    <div>

          <img src="../public/logo.png" alt="logo" />

      <form onSubmit={handleLogin}>
        <label></label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label></label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit" style={{borderColor:"black" , backgroundColor:"blue", color:"white", borderRadius: 4, padding: "0px 30px"}}>Iniciar sesión</button>



        {errorMessage !== null ? <p>{errorMessage}</p> : null}

      </form>

        <br />
    
        <button onClick={handleCreateAccount} style={{borderColor: "blue", backgroundColor: "transparent", color: "blue", borderRadius: 4, padding: "0px 30px", marginTop: 100}}>Crear cuenta nueva</button>
      
    </div>
  );
}

export default Login;
