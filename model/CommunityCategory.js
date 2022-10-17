const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const communityCategorySchema = new Schema({
       categoryName:{
        type:String
       }
  })

module.exports=mongoose.model('communitycategories',communityCategorySchema)