const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const userCommunitySchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId, ref:"users"
    },
    communityId:{
        type:Schema.Types.ObjectId, ref:"communities"
    },
    joinedAt:{
        type: Date,
        default: Date.now
    }
})

module.exports=mongoose.model("usercommunities",userCommunitySchema);
