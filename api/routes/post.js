const express = require('express');

const router = express.Router();

const user = require('../models/user');

const post = require('../models/post');

const mongoose = require('mongoose');

router.post('/post', (req,res)=>{
    const{title, image, caption, postedBy} = req.body;
    const newPost = new post({
        title,
        image,
        caption,
        date:Date.now(),
        postedBy
    })
    newPost.save().then(mypost=>{
        console.log(mypost);
        res.send('posted successfully');
    }).catch(err=>{
        res.send('something went wrong');
    })
})

module.exports = router;