var jwt = require('jsonwebtoken');
require("dotenv").config();
const authenticator=(req,res,next)=>{
    const token=req.headers?.authorization?.split(" ")[1];
    try{
        if(token){
            jwt.verify(token, process.env.secretkey, function(err, decoded) {
                console.log(decoded) 
                 if(decoded){
                     const userID=decoded.userID;
                     req.body.userID=userID;
                     next()
                 }else{
                     res.send({"msg":"please login again"})
                 }
              });
         }else{
            res.send({"msg":"please login again"})
         }
    }catch(err){
        console.log(err);
        res.send({"msg":"something went wrong,try again later"})
    }
    


}

module.exports={authenticator}