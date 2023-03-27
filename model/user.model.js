const mongoose=require("mongoose")

const user_Schema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String,
    age:Number,
    city:String,
    is_married:Boolean
})

const UserModel=mongoose.model("user",user_Schema)
module.exports={UserModel}