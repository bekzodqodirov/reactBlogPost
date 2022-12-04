const router = require('express').Router()
const Post = require('../models/Post')


////////// CREATE A NEW POST
router.post('/', async(req, res) =>{
    const newPost = new Post(req.body)
    try{
        
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    }catch(err){
        res.status(500).json(err)
    }
})



/////////// UPDATE A POST 

router.put('/:id', async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if(req.body.username === post.username ){
            const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true}) 
            res.status(200).json(updatedPost)
        }else{
            res.status(401).json('You can only update your account!')
        }
    }catch(err){
        res.status(500).json(err)
    }
})


/////////// DELETE A POST


router.delete('/:id', async (req, res) => {
    
    try{
        const post = await Post.findById(req.params.id);
        if(req.body.username === post.username ){
            await post.delete();
            res.status(200).json('post have been deleted')
        }else{
            res.status(401).json('You can only delete your posts')
        }
    }catch(err){
        res.status(500).json(err) 
    }
})


/////////       GET SINGLE POST

router.get('/:id', async (req, res) => {

    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err) 
    }
});

/////////////////// GET ALL POSTS

router.get('/', async (req, res)=>{
    const catName = req.query.cat;
    const userName = req.query.username;

    try{
        let posts;
        if (userName){
            posts = await Post.find({username:userName}).sort([['updatedAt', -1]]);
            
        }else if(catName){
            posts = await Post.find({categories:{
            $in:[catName]
            }
        }).sort([['updatedAt', -1]]);

        }else{
            posts = await Post.find().sort([['updatedAt', -1]]);
            
        }
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router