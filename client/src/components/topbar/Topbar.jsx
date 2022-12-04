import './topbar.css'
import{ Facebook,Twitter,Instagram,Pinterest, Search}from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import {Context} from '../../context/Context';

function Topbar() {
  const PF = 'http://localhost:4000/images/'
  const { user, dispatch} = useContext(Context);
  
  const handleLogout = ()=>{
    dispatch({type:'LOGOUT'})
    window.location.replace('/')
  }
    
  return (
    <div className='top'>
        <div className="topLeft">
            <a href="https:/facebook.com"><Facebook className ="topIcon" /></a>
            <a href="https:/twitter.com"><Twitter  className ="topIcon" /></a>
            <a href="https:/instagram.com"><Instagram  className ="topIcon" /></a>
            <a href="https:/facebook.com"><Pinterest  className ="topIcon" /></a>
        </div>
        <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <Link className='link' to="/contact"><li className="topListItem">CONTACT</li></Link>
          {user && (<li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>)}
          
          {user && <li className="topListItem" onClick={handleLogout}>LOGOUT</li>}
        </ul>
      </div>
        <div className="topRight">
            <div className="topSearchItem"><Search /></div>
            {user? <Link className="link" to={"/settings"}><img src={PF + JSON.parse(user).profilePic} alt="" className="topAvatarImg" />
            </Link>:<div><Link className="link" to="/login"><span className='topListItem'>LOGIN</span></Link>
                         <Link className="link" to="/register"><span className='topListItem'>REGISTER</span></Link></div>}
                    </div>
    </div>
  )
}

export default Topbar;
