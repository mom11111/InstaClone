const express = require('express');

const app = express();

const bodyparser = require('body-parser');

const mongoose = require('mongoose');

const auth = require('./routes/auth')

const post = require('./routes/post');

app.use(bodyparser.urlencoded({extended:true}));

app.use(bodyparser.json());

mongoose.connect('mongodb+srv://nishant:Ok123456@@cluster0-uq6hl.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err,res)=>{
    if(err)
       console.log(err);
    else{
        console.log('connected to db');
    }
});


app.use(auth);
app.use(post);

const port = 4000 || process.env.port;

app.listen(port,(err,res)=>{
    if(err)
       console.log(err);
    else{
        console.log(`connected to ${port}`);
    }
})