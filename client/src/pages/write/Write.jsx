import './write.css'
import{ AddAPhoto} from '@mui/icons-material';
import {useState, useContext} from 'react';
import axios from 'axios';
import {Context} from '../../context/Context'

function Write() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState(null)
  const {user} = useContext(Context);
  
 
  const handleSubmit = async (e) =>{
    e.preventDefault();

    const newPost = {
      'username': JSON.parse(user).username,
      'title': title,
      'desc': desc,
    }
    if(file){
      const data = new FormData();
      const fileName =  Date.now() + file.name;
      data.append('name', fileName)
      data.append('file', file)
      console.log(data)
      newPost.photo = fileName;
      try{
        
        await axios.post('/upload', data);
        console.log('end upload')
      }catch(err){} 
    }
    try{ 
      const res = await axios.post('/posts',newPost)
      window.location.replace('/single/' + res.data._id)
    }catch(err){}
    }

  return (
    <div className='write'>

    {file && (<img className="writeImg" src={URL.createObjectURL(file)} alt="" />)}
        
        <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput"><AddAPhoto className='writeIcon' /></label>
                <input type="file" id="fileInput" style={{display:"none"}} onChange={e => setFile(e.target.files[0])}/>
                <input type="text" placeholder='Title' className='writeInput' autoFocus={true} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="writeFormGroup">
                <textarea placeholder='Tell your story...' type="text" className='writeInput writeText' onChange={e => setDesc(e.target.value)}></textarea>
            </div>
            <button className='writeSubmit' type='submit'>Publish</button>
        </form>

        
    </div>
  )
}

export default Write
