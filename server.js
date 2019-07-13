const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/User');
const Post = require('./models/Post');

const db = "mongodb+srv://astrolabs:makeithappen@cluster0-svfks.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: false}));

mongoose.connect(db, {}).then(()=> console.log("Db Connect")).catch(err => console.log(err));

app.get('/', (req, res) => res.json({
    msg: "Hello Amigo!! taha"
}));

app.post('/users', (req, res) => {
   const newUser = new User(({
       name: req.body.name,
       email: req.body.email,
       password: req.body.password
   })) 

   newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err))
});

app.get('/users', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => console.log(err))
})

app.post('/post', (req, res) => {
    User.findOne({email: req.body.email}).then( user => {
        if(user){
            const newPost = new Post({
                message: req.body.message,
                user: user
            })
            newPost
         .save()
         .then(post => res.json(post))
         .catch(err => console.log(err))
        }
        else {
            return res.status(400).json({message: "User not found"})
        }
    })
    
 });

 app.post('/users/posts', (req, res) => {
    //your code goes here
    User.findOne({email: req.body.email})
        .then( user => {
            Post.find({user: user})
                .then(post => res.json(post))
                .catch(err => console.log(err))
        })
});

 app.get('/post', (req, res) => {
    Post.find()
        .then(post => res.json(post))
        .catch(err => console.log(err))
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));