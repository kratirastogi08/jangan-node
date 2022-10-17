const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const viewPointCategorySchema = new Schema({
       categoryName:{
        type:String
       }
  })

 module.exports=mongoose.model('viewpointcategories',viewPointCategorySchema)
