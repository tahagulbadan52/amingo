const express = require('express');
const User = require('../models/User');
const Posts = require('../models/Post')

const router = express.Router();

router.post('/', (req, res) => {
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

 router.get('/', (req, res) => {
    Post.find()
        .then(post => res.json(post))
        .catch(err => console.log(err))
});