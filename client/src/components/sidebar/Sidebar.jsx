import './sidebar.css'
import{ Facebook,Twitter,Instagram,Pinterest, Search}from '@mui/icons-material';
import {useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [cats, setCats] = useState([])
    useEffect(()=>{
        const getCats = async ()=>{
            const res = await axios.get('/categories')
            setCats(res.data)
        }
        getCats()
    },[])
  return (
    <div className='sidebar'>
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img src="https://thumbs.dreamstime.com/b/boy-reading-book-continuous-one-line-vector-illustration-minimalist-concept-education-theme-back-to-school-design-boy-reading-book-157892745.jpg" alt="" />
            <p>Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry.</p>
        </div>
        <div className="sidebarItem">
            <div className="sidebarTitle">CATIGORIES</div>
            <ul className="sidebarList">
                
                {cats.map(c => <Link className='link' to={`/?cat=`+ c.name }> <li className="sidebarListitem">{c.name}</li></Link>)}
                

            </ul>
        </div>
        <div className="sidebarItem">
            <div className="sidebarTitle">FOLLOW US</div>
            <div className="sidebarSocial">
                <Facebook className ="sidebarIcon" />
                <Twitter  className ="sidebarIcon" />
                <Instagram  className ="sidebarIcon" />
                <Pinterest  className ="sidebarIcon" />
            </div>

        </div>
    


    </div>
  )
}

export default Sidebar;
