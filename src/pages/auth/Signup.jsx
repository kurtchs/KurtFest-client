import service from "../../service/config.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ... contactar al backend para registrar al usuario aqui

    try {

      // ahora con esto no es necesario el axios aqui, todo lo esta haciendo en service
      await service.post(`/auth/signup`, {
        username: username,
        email: email,
        password: password
      })

      navigate("/login")
      
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

  return (
    <div>

      <h1>Formulario de Registro</h1>
    
      <form onSubmit={handleSignup}>

    
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

       
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

        
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Registrar</button>

        {errorMessage !== null ? <p>{errorMessage}</p> : null}

      </form>
      
    </div>
  );
}

export default Signup;
