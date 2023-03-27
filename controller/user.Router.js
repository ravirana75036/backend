const {Router}=require("express")
const {useModel, UserModel}=require("../model/user.model");
var jwt=require('jsonwebtoken');
const bcrypt=require("bcrypt");
const userRouter=Router();

userRouter.post("/register",async(req,res)=>{
    const {name,password,gender,email,age,city,is_married}=req.body;
    var pass
    bcrypt.hash(password,2,async(err,data)=>{
        if(err){
            console.log(err)
        }
        pass=data
        let user=new UserModel({name,password:pass,gender,email,age,city,is_married})
        try{
            await user.save()
            res.send({response:"User succfully Registered"})
        } catch(err){
            console.log(err)
        }
    })
   

})

userRouter.post("/login",async(req,res)=>{
    const {name,password}=req.body;
    const data=await UserModel.findOne({name:name});
    console.log("out",req.body)
    try{
        bcrypt.compare(password,data.password,(err,result)=>{
            if(result){
                let token=jwt.sign({name},process.env.secretkey)
                res.send({status:"Log in Succesffull",token})
            }
        })
    } catch(err){
        res.send("Please enter the correct details")
    }
})

module.exports={userRouter};