const mongoose=require('mongoose')

const connection=async ()=>{
    
        mongoose.connect("mongodb://localhost:27017/DemoDB",{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }).then(()=>{
            console.log("connected")
        })
       .catch((err)=>{
        console.log("not connected")
       })
    
   
 
}

module.exports=connection