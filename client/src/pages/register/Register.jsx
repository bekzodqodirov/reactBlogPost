import "./register.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";



export default function Register() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(false);

  const handlerSubmit = async (e)=>{
    setErr(false)
    e.preventDefault();
    try{
      const res = await axios.post('/auth/register',{
        username,
        email,
        password
      })
      res.data && window.location.replace('/login')
    }catch(err){
      setErr(true)
    }
    
  }
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handlerSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." onChange={e=> setUsername(e.target.value)}/>
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." onChange={e=> setEmail(e.target.value)}/>
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." onChange={e=> setPassword(e.target.value)} />
        <button className="registerButton" type="submit" >Register</button>
        {err && <span style={{color:'red', marginTop:"10px"}}>something went wrong!</span>}
      </form>
        <Link className="link" to='/login'><button className="registerLoginButton">Login</button></Link>
        
    </div>
    )
}