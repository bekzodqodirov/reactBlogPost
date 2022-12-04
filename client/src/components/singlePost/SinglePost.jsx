import './singlePost.css'
import {Edit, Delete} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import {useEffect, useState, useContext} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Context} from '../../context/Context'



function SinglePost() {
  const location = useLocation()
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({})
  const PF = 'http://localhost:4000/images/'
  const {user} = useContext(Context);


  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('')
  const [updateMode, setUpdateMode] = useState(false)

  useEffect( 
    () => {
    const getPost= async ()=>{
      const res = await axios.get('/posts/' + path)
      setPost(res.data)
    }
    getPost();
  }, [path])
  


  const handleDelete = async (e) =>{
    e.preventDefault();
    try{
      await axios.delete('/posts/' + path, {data:{
        username:JSON.parse(user).username}
      });
      window.location.replace('/')      

    }catch(err){}
  }

  const handleUpdate = async (e) =>{
    e.preventDefault();

    const res = await axios.put('/posts/'+ path, {
      username:JSON.parse(user).username,
      title:title,
      desc:desc
    }
      )
    window.location.replace('/single/' + path)
    


  }
  


  return (
    <div className='singlePost'>
        {post.photo && <img class="singlePostImg"src={PF+post.photo} alt="" />}
        
        
        <div className="singlePostInfo">
            {updateMode ? <input autoFocus type='text' className='singlePostTitleInput' value={title} onChange={(e) => {setTitle(e.target.value)}}/> :(
            <div className="singlePostTitle">
              <h1>{post.title}</h1>
              {JSON.parse(user)?.username === post.username &&
                <div className="singlePostEdit">
                  <span> <Edit className="editIcon iconEdit" onClick={()=>{
                    setUpdateMode(true)
                    setTitle(post.title)
                    setDesc(post.desc)


                  }}/></span>
                  <span ><Delete  className="editIcon iconDelete" onClick={handleDelete}/></span>
                </div>
              }
            
            
            </div>
            )}

            
            <div className="singleInfo">
                <p className="singlePostAuthor">Author: <Link className='link' to={`/?username=`+post.username}><b>{post.username}  </b></Link>   </p>
                <p className="singlePostDate">       {new Date(post.createdAt).toDateString()}</p>

            </div>
            <hr />
            {updateMode ? <textarea rows="8" className='singlePostDescInput' value={desc} onChange={(e) => {setDesc(e.target.value)}} />: (
              <p className="singlePostDesc">{post.desc}
             </p>
            ) }
            
            {updateMode && (
              <div className='updateBtn'>
              <button className ='singlePostbuttonCancle' onClick={()=> {setUpdateMode(false)}}> Cancel</button>
              <button className ='singlePostbutton' onClick={handleUpdate}> Update</button>
            </div>
            ) }
            
        </div>
    </div>
  )
}

export default SinglePost
