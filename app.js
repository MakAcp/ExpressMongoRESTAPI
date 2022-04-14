const express = require('express');
const res = require('express/lib/response');

const mongoose = require('mongoose');
const app= express();
const bodyparser=require('body-parser');
require('dotenv').config();
require('dotenv/config');
//Middleware normally used for authenticaion eg app.use(auth)
app.use(bodyparser.json());
const postsRoute= require('./routes/posts')
app.use('/posts',postsRoute);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:');
})

db.on('error', err => {
  console.error('connection error:', err)
})

//ROUTES
app.get('/',(req,res) => {

    res.send('We are on Home :)');

});








//We specify the port we want to listen to here
app.listen(3000);