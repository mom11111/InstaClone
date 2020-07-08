const mongoose = require('mongoose');

const commLikeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    },
    likes:{
        like:Number,
        likedBy:[{
           type:String,
           require:true
        }],
        require:true
    },
    comments:[{
         title:String,
         reply:[{
             type:String
         }]
    }]
})

const commLike = mongoose.model('commLike', commLikeSchema);

module.exports = commLike;