const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');

const user = require('../models/user');

const follow = require('../models/following');

const post = require('../models/post');

const mongoose = require('mongoose');

router.post('/register', (req,res)=>{
   
    const{name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({message:'fill all field'});
    }

        bcrypt.hash(password,12).then(hashedpassword=>{
            const newUser = new user({
                name,
                email,
                password:hashedpassword
            });
            newUser.save().then(user=>{
                console.log(user);
                res.send(user);
            }).catch(err=>{
                res.send(err);
            })
        }).catch(err=>{
            res.send(err);
        })
        
    
});


router.post('/login', (req,res)=>{

    const {email, password} = req.body;

    user.findOne({email}).then(myuser=>{
        bcrypt.compare(password, myuser.password).then(doMatch=>{
            const userInfo = [];
            userInfo.push(myuser);
            follow.countDocuments({follower:myuser._id}).then(followingCount=>{
                userInfo.push(followingCount);
                 follow.countDocuments({follwing:myuser._id}).then(followerCount=>{
                     userInfo.push(followerCount);
                     console.log(userInfo);

                     follow.find({follower:myuser._id}).then(myfollowings=>{
                        const alreadyFollowed =[];
                        alreadyFollowed.push(myuser._id);
                        for(let i=0;i<myfollowings.length;i++){
                            alreadyFollowed.push(myfollowings[i].following);
                            if(i==myfollowings.length-1){
                                console.log(alreadyFollowed);
                                post.find({postedBy:{$in:alreadyFollowed}}).limit(10).then(allposts=>{
                                    userInfo.push(allposts);
                                    console.log(userInfo);
                                    res.send(userInfo);
                                })
                            }
                        }
                    })

                 })
            })

        }).catch(err=>{
            res.send('wrong email or password');
        })
    }).catch(err=>{
        console.log('user not find');
        res.send('user not find');
    })

});

router.post('/getfollowings', (req,res)=>{
     const {follower} = req.body;
     follow.find({follower:follower}).then(myfollowings=>{
         const alreadyFollowed =[];
         for(let i=0;i<myfollowings.length;i++){
             alreadyFollowed.push(myfollowings[i].following);
             if(i==myfollowings.length-1){
                 user.find({_id:{$in:alreadyFollowed}}).then(allfollowings=>{
                     res.send(allfollowings);
                 })
             }
         }
     })
})



router.post('/getfollowers', (req,res)=>{
    const {following} = req.body;
    follow.find({following:following}).then(myfollowers=>{
        const alreadyFollowed =[];
        for(let i=0;i<myfollowers.length;i++){
            alreadyFollowed.push(myfollowings[i].follower);
            if(i==myfollowers.length-1){
                user.find({_id:{$in:alreadyFollowed}}).then(allfollowers=>{
                    res.send(allfollowers);
                })
            }
        }
    })
})







router.post('/getusers', (req,res)=>{
    const {follower}= req.body;
    console.log(follower);
    follow.find({follower:follower}).then(already=>{
        const nonfollowed=[];
        nonfollowed.push(follower);
        for(let i=0;i<already.length;i++){
            nonfollowed.push(already[i].following);
            if(i==already.length-1){
                console.log(nonfollowed);
                user.find({_id:{$nin:nonfollowed}}).then(users=>{
                    console.log(users);
                    res.send(users);
                })
            }
        }
    })
    
})

router.post('/follow', (req,res)=>{
    const{follower, following} = req.body;
    let mongoObjectId = mongoose.Types.ObjectId(follower);
    console.log(mongoObjectId);
    const newFollowing = new follow({
        follower:mongoObjectId,
        following
    });
    newFollowing.save().then(ans=>{
        res.send(ans);
    }).catch(err=>{
        console.log(err);
    })
})

module.exports = router;