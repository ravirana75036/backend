const {Router}=require("express");
const {PostModel}=require("../model/post.model");
const {UsertModel}=require("../model/user.model");

require('dotenv').config();

var jwt=require('jsonwebtoken');
const postRouter=Router();
const authentication=async (req,res,next)=>{
    try{
        const token = req.headers.token;
        console.log(req)
        var {name}=jwt.verify(token,process.env.secretkey);
        let user=await UsertModel.findOne({name:name})

        if(user){
            req.body.user_id=user_id;
            console.log("Varify")
            next()
        }

    } catch(err){
        // console.log(err)
        res.send("Please Athonicate")
    }
}

postRouter.get("/",authentication,async(req,res)=>{
    const {user_id}=req.body
    try{

        let posts =await PostModel.find({user_id})
        res.send(posts)

    }catch(err){
        res.send("Some error in getting data")
    }
})

postRouter.post("/add",authentication,async(req,res)=>{
    const {user_id,title,body,device}=req.body
    try{
        let posts=new PostModel({user_id,title,body,device})
        await posts.save()
        res.send("Post Successfully")

    } catch(err){
        res.send("Some error in Posting")
    }
})

postRouter.patch("/update/:id",authentication,async(req,res)=>{
    const {id}=req.params;
    try{
        await PostModel.findOneAndUpdate({_id:id},req.body)
        res.send("Update successully")
    } catch(err){
        res.send("some error in updating")
    }
})



postRouter.delete("/delete/:id",authentication,async(req,res)=>{
    const {id}=req.params;
    try{
        await PostModel.findOneAndDelete({_id:id})
        res.send("Delete successully")
    } catch(err){
        res.send("some error in Delete")
    }
})


module.exports={postRouter}
