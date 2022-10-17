const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new Schema({
    firstName:{
        type:String,      
    },
    lastName:{
        type:String,      
    },
    dob:{
        type:Date,
        
    },
    gender:{
        type:String,
       
    },
    state:{
        type:String,
       
    },
    city:{
        type:String,
        
    },
    town:{
        type:String
    },
    phno:{
        type:String,
       
    },
    stage:{
        type:Number,
        default:0
       } ,
     otp:{
        type:String,
       },
       token:String,
       viewPoints:[
        {
            type:Schema.Types.ObjectId,
            ref:'viewpoints'
        }
       ]
})

module.exports=mongoose.model("users",userSchema)