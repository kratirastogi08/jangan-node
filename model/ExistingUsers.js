const mongoose=require('mongoose')
 const Schema= mongoose.Schema
  const existingUser=new Schema({
           phno:{
            type:String,
            required:true
           } ,
           stage:{
            type:Number,
            default:0
           } ,
           isOTPVerified:{
            type:Boolean,
            default:false
           }         
       })

module.exports=mongoose.model("ExistingUser",existingUser)