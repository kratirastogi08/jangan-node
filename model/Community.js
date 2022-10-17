const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const communitySchema = new Schema({
       title:{
        type:String
       },
       description:{
        type:String
       },
       userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
       },
       locations:[
        {
            state:{
                type:Schema.Types.ObjectId, ref:"states"
            },
            district:{
                type:Schema.Types.ObjectId, ref:"districts"
            }
        }
            
       ],
       headquarters:[
        {
            state:{
                type:Schema.Types.ObjectId, ref:"states"
            },
            district:{
                type:Schema.Types.ObjectId, ref:"districts"
            }
        }
       ],
       photo:{type:String},
       activateDonation:{
        type:Boolean,
        default:false
       },
       isCommunityRegistered:{
        type:Boolean,
        default:false
       },
       isCommunityPrivate:{
        type:Boolean,
        default:false
       },
       category:{
       type:Schema.Types.ObjectId,
       ref:"communitycategories"
       }
  })

  module.exports=mongoose.model('communities',communitySchema);