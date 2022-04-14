const express=require('express');
const router=express.Router();
const Post= require('../models/Post');
const sendmail = require("@sendgrid/mail");
sendmail.setApiKey('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');
router.get('/',async (req,res) => {
    try{
        const posts=await Post.find();
        res.json(posts);
    }
    catch{
        res.json({message: err})
    }
    

});

router.post('/',(req,res) => {
    const post=new Post({
        title: req.body.title,
        description: req.body.description
    });

    post.save()
        .then(data => {
            res.json(data);
            const message={
                to: "2017.nihar.kalsekar@ves.ac.in",
                from: "nihar.kalsekar@gmail.com",
                subject:"seding u love",
                text:"lol trolled",
                html:'<h1>lol trolled</h1>',
            };
            sendmail.send(message)
            .then(response=> console.log('Email sent...'));
        })
        .catch(err=> {
            res.json({message:err});
        })

       
   
      
       

});

router.get('/:postid',async (req,res) => {
    try{
        const post= await Post.findById(req.params.postid)
        res.json(post);
    }
    catch{
        res.json({message: err})
    }
});

// if want to take input from url then req.params.(whatever variable in url), if want to take input through body then req.body.(whatever var in body)
router.delete('/',async (req,res) => {
    try{
          const removedpost= await Post.remove( { _id : req.body._id } );
          res.json(removedpost);
    }
    catch{
        res.json({message: err})
    }
});

router.put("/:id", (req, res, next) => {
    return Post.updateOne(
      { _id: req.params.id },  // <-- find stage
      { $set: {                // <-- set stage
         id: req.body.id,     // <-- id not _id
         title: req.body.title,
         description: req.body.description
        } 
      }   
    ).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  });



module.exports=router;