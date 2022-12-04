const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/catigories')
const multer = require('multer');
const path = require('path')

dotenv.config();



mongoose.connect(process.env.MONGODBURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(console.log('connected to mongodb')).catch((err) => console.log(err));



const storage = multer.diskStorage({
    destination :(req,file,cb) => {
        cb(null, 'images')
    },
    filename: (req, file,cb) => {
        cb(null, req.body.name)
    }
});

const upload = multer({storage:storage});


app.post('/api/upload', upload.single('file'), (req,res) => {
    res.status(200).json('file has been uploaded!');});

app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '/images')))
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/posts', postRoute )
app.use('/api/categories', categoryRoute)


app.listen(4000, ()=>{
    console.log('backend is running');
})