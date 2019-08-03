const express = require('express');
const User = require('../models/User');
const Posts = require('../models/Post')

const router = express.Router();

router.post('/', (req, res) => {
    User.findOne({email: req.body.email}).then( user => {
        const newPost = new Post({
            message: req.body.message,
            user: req.user
        })
        newPost
        .save()
        .then(post => res.json(post))
        .catch(err => console.log(err))
    })
    
 });

 router.get('/', (req, res) => {
    Post.find({user: req.user})
        .then(post => res.json(post))
        .catch(err => console.log(err))
});

/**
 * Post route to like a post
 * 
 * @name POST: /posts/:id/like
 * @param {string} id - Id of the post
 */
router.post('/:id/like', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.likes.push(req.user);
            post.save()
                .then(_post=>{
                    res.json({"message": "success"})
                })
        })
})

module.exports = router;