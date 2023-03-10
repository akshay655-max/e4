const express=require("express")
const cors=require("cors");

const app=express();
const{connection}=require("./config/db")
const{UserRouter}=require("./routes/user.route")
const{authenticator}=require("./middleware/authenticator.middleware")
const{postRouter}=require("./routes/post.route")
const PORT=7500;
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("welcome to home page")
})

app.use("/users",UserRouter);

app.use(authenticator);
app.use("/posts",postRouter)




app.listen(PORT,async(req,res)=>{
    try{
        await connection;
        console.log("connecting db successfully");

    }catch(err){
        console.log("error in connecting db");
        console.log(err)
    }
    console.log(`listen to ${PORT} successfully`)
})