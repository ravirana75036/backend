const express=require("express");
const {connection} =require("./config/db")
const {postRouter}=require("./controller/posts.Router")
const {userRouter}=require("./controller/user.Router")

require('dotenv').config()
const cors=require("cors");

const app=express();
app.use(cors({
    origin:"*"
}))

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/user",userRouter);
app.use("/posts",postRouter)
app.listen(process.env.port,()=>{
    try{
        connection;
        console.log("Server is Start")
    }  catch(err){
        console.log("Some error in mongoose")
    }
})