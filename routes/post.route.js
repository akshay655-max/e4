const express=require("express");
const { PostModel } = require("../models/post.model");
const postRouter=express.Router();

postRouter.post("/create",async (req,res)=>{
    const payload=req.body;

    try{
        const post=new PostModel(payload)
        await post.save();
        res.send({"msg":"post created successfully"})
    }catch(err){
        console.log(err);
        res.send({"err":"something went wrong ,pls try again later"})
    }
   
   
})

postRouter.get("/",async (req,res)=>{
    const device=req.query.device;
    const device1=req.query.device1;
    const device2=req.query.device2;
    console.log(typeof(device1));
    console.log(device2);
    try{
        if(device){
            const post=await PostModel.find({device})
            res.send(post);
        }else if(device1 && device2){
            const post=await PostModel.find({$and:[{device:device1},{device:device2}]})
            console.log(post);
            res.send(post)
        }else{
            const post=await PostModel.find();
            res.send(post)
        }
    }catch(err){
        console.log(err);
        res.send({"err":"something went wrong ,pls try again later"})
    } 
})

postRouter.patch("/update/:postID",async (req,res)=>{
    const ID=req.params.postID;
    const userID_request=req.body.userID;
    const post=await PostModel.findOne({"_id":ID})
    const userID_post=post.userID;
    const payload=req.body
    try{
        if(userID_request===userID_post){
            await PostModel.findByIdAndUpdate({"_id":ID},payload);
            res.send({"msg":"note updated successfully"});
        }else{
            res.send("you are not authorizsed")
        }
       
    }catch(err){
        console.log(err);
        res.send({"msg":"somethng went wrong,pls try again later"})
    }

})
postRouter.delete("/delete/:postID",async (req,res)=>{
    const ID=req.params.postID;
    const userID_request=req.body.userID;
    const post=await PostModel.findOne({"_id":ID})
    const userID_post=post.userID;
    try{
        if(userID_request===userID_post){
            await PostModel.findByIdAndDelete({"_id":ID});
            res.send({"msg":"note deleted successfully"});
        }else{
            res.send("you are not authorizsed")
        }
       
    }catch(err){
        console.log(err);
        res.send({"msg":"somethng went wrong,pls try again later"})
    }

})




module.exports={postRouter};