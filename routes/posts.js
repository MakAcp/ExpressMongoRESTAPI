const express=require('express');
const router=express.Router();
const Post= require('../models/Post');

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

module.exports=router;