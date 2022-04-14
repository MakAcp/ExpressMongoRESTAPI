const express = require('express');
const res = require('express/lib/response');
const sendmail = require("@sendgrid/mail");
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


const API_KEY= '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'
sendmail.setApiKey(API_KEY);
const message={
    to: "2017.nihar.kalsekar@ves.ac.in",
    from: "nihar.kalsekar@gmail.com",
    subject:"seding u love",
    text:"lol trolled",
    html:'<h1>lol trolled</h1>',
};
sendmail.send(message)
.then(response=> console.log('Email sent...'))




//We specify the port we want to listen to here
app.listen(3000);