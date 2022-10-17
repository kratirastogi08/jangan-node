const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const viewPointSchema = new Schema({
       viewPointName:{
        type:String
       },
       category:{
       type:Schema.Types.ObjectId,
       ref:"viewpointcategories"
       }
  })

  module.exports=mongoose.model('viewpoints',viewPointSchema)