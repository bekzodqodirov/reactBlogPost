import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import {AccountCircle} from '@mui/icons-material';
import {Context} from '../../context/Context'
import {useContext, useState} from 'react';
import axios from 'axios';


function Settings() {
  const {user,dispatch, isFetching} = useContext(Context);
  const PF = 'http://localhost:4000/images/'
  const[username, setUsername] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[file, setFile] = useState(null)
  const[updateSuccess, setUpdateSuccess] = useState(false)
  
  const handleUpdate = async (e) =>{
    e.preventDefault();
    dispatch({type:'UPDATE_START'})
    const updatedUser ={
        userId:JSON.parse(user)._id,
        username:username,
        password:password,
        email:email,       
      
    }
    if(file){
      const data = new FormData();
      const fileName =  Date.now() +"profilePic"+ file.name;
      data.append('name', fileName)
      data.append('file', file)

      try{
        await axios.post('/upload', data);
        console.log('end upload')
        updatedUser.profilePic = fileName;
      }catch(err){} 
    }

    try{
      const res  = await axios.put('/users/'+ JSON.parse(user)._id, updatedUser )
      setUpdateSuccess(true)

      dispatch({type:'UPDATE_SUCCESS', payload: JSON.stringify(res.data)})
    }catch(err){}
    dispatch({type:'UPDATE_FAILURE'})
  }
  

  return (
    <div className='settings'>
      <div className="settingsWrapper">
        <div className="settingsTitle">
            <span className="settingsTitleUpdate">Update Your Account</span>
            <span className="settingsTitleDelete">Delete Account</span>
        </div>

        <form action="" className="settingsForm" onSubmit={handleUpdate}>
        <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file? URL.createObjectURL(file): PF + JSON.parse(user).profilePic}
              alt=""
            />
        <label htmlFor="fileInput">
            <AccountCircle  className='settingsPPIcon '/>
        </label>
        <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            className="settingsPPInput"
            onChange={e => setFile(e.target.files[0])}
        />
          </div>
          <label>Username</label>
          <input type="text" placeholder="Bekzod" name="name" onChange={(e)=>{setUsername(e.target.value)}}/>
          <label>Email</label>
          <input type="email" placeholder="bekzod@gmail.com" name="email" onChange={(e)=>{setEmail(e.target.value)}} />
          <label>Password</label>
          <input type="password" placeholder="Password" name="password"  onChange={(e)=>{setPassword(e.target.value)}}/>
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {updateSuccess && <span style={{color:'green', marginTop:'20px',textAlign:"center"}}>Account has been updated...</span>}
        </form>
      </div>
        <Sidebar />
    </div>
  )
}

export default Settings
