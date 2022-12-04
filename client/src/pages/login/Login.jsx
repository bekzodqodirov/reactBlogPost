import "./login.css";
import { Link } from "react-router-dom";
import { useRef,useContext, useState } from "react"; 
import { Context } from "../../context/Context";
import axios from "axios";


export default function Login() {

  const userRef = useRef()
  const passwordRef = useRef()
  const [loginError, setLoginError] = useState(false);
  const { dispatch, isFetching} = useContext(Context)

  const handleSubmit = async (e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try{
      const res = await axios.post("/auth/login", {
        username:userRef.current.value,
        password:passwordRef.current.value,
      })
      dispatch({type:"LOGIN_SUCCESS", payload:JSON.stringify(res.data)})
      window.location.replace('/')
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"});
      setLoginError(true)
    }



  }
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your Username..." ref={userRef}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..."  ref={passwordRef}/>
        {loginError && <span style={{marginTop:"10px", color:"red"}}>Something went wrong!</span>}
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
        <Link className="link" to='/register'><button className="loginRegisterButton">Register</button></Link>
        
    </div>
  );
}