import './post.css'
import { Link } from "react-router-dom";
function Post({post}) {

const PF = 'http://localhost:4000/images/'
  return (
    <div className='post'>
      {post.photo && <img class="postImg"src={PF + post.photo} alt="" /> }
        
        
        <div className="postInfo">
            <div className="postCats">
            {post.categories.map(cat => <span className="postCat">{cat}</span>)}
            </div>
            <Link className='link' to={'/single/' + post._id}><span className="postTitle">{post.title} </span></Link>
            
            <hr />
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            <hr />
            <p className="postDesc">{post.desc}</p>

        </div>
    </div>
  )
}

export default Post
