const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema(
    {
        name:
        {
            type:String,
            required:true
        }
    })
module.exports=user=mongoose.model("user",userSchema);