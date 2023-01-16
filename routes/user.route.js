const express=require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require("dotenv").config();
const { UserModel } = require("../models/user.model");

const UserRouter=express.Router();

UserRouter.get("/",(req,res)=>{
    res.send("user page")
})

UserRouter.post("/register",async (req,res)=>{
    const {name,email,gender,password}=req.body;
    const userPresent=await UserModel.find({email:email})
    if(userPresent?.email){
        res.send({"msg":"Try loggin in ,already exists"})
    }else{

        try{
            bcrypt.hash(password, 5, async function(err, hash) {
                const user=new UserModel({email,name,gender,password:hash})
                await user.save();
                res.send({"msg":"signup successfully"})
              });
        }catch(err){
            console.log(err);
        res.send({"err":"something went wrong ,pls try again later"})
        }
      
    }
 
})

UserRouter.post("/login",(async (req,res)=>{
 const {email,password}=req.body;
  const user=await UserModel.find({email});
  try{
    if(user.length>0){
        const hash=user[0].password;
        bcrypt.compare(password, hash, function(err, result) {
          // result == true
          if(result){
              var token = jwt.sign({ userID:user[0]._id },process.env.secretkey );
              res.send({"msg":"login successfully","token":token})
          }else{
              res.send({"msg":"wrong credential"})
          }
      });
  
    }else{
        res.send({"msg":"wrong credential"})
    }
  
  }catch(err){
    console.log(err);
    res.send({"err":"something went wrong ,pls try again later"})
  }
 
    
}))






module.exports={UserRouter};