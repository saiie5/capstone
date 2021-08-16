import React , {useState , useEffect} from 'react'
import axios from 'axios'

import Error from "../components/Error";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loginUser =async()=>{
    const user={
        email,
        password
    }
    try {
      setLoading(true)
      const result = (await axios.post("/api/users/login", user)).data;
      setLoading(false)

      localStorage.setItem('currentUser' , JSON.stringify(result))
      window.location.href='/home'
    } catch (error) {
      
      console.log(error)
      setLoading(false)
      setError(true)
    }
    
  }
    return (
      <>
        
        <div className="login">
          <div className="loginContainer">
            {error && <Error message="Invalid Credentials" />}
            <h1 className="heading">
              <i class="fas fa-hotel" aria-hidden="true"></i> Login to EasyParking <i class="fa fa-map-marker" aria-hidden="true"></i>
            </h1>

            <label>
              <i class="fa fa-envelope" aria-hidden="true"></i> Email
            </label>
            <input
              type="text"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <label>
              <i class="fas fa-key" aria-hidden="true"></i> Password
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="button_class" onClick={loginUser}>
              Login
            </button>
          </div>
        </div>
      </>
    );
}

export default LoginScreen
