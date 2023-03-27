const mongoose=require("mongoose")

const post_Schema=mongoose.Schema({
    title:String,
    body:String,
    device :String,
    no_of_comments:Number,
    user_id:String
})

const PostModel=mongoose.model("Post",post_Schema)
module.exports={PostModel}

