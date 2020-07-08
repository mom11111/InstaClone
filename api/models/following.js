const mongoose = require('mongoose');


const followSchema = new mongoose.Schema({
    follower:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
    },
    following:
        {
            type:String,
            require:true
        }
})

const follow = mongoose.model('follow', followSchema);

module.exports = follow;