const Community=require("../model/Community")
const CommunityCategory=require("../model/CommunityCategory")
const response=require("../helper/CommonResponse")
const HttpStatus = require('http-status');
const UserCommunity=require("../model/UserCommunity")

const createCommunityCategory = async (req,res,next) => {
    try{
       const com= await CommunityCategory.findOne({categoryName:req.body.categoryName})
       if(com)
       { 
        return response.error(req,res,{message:"Community category name already exists"},HttpStatus.CONFLICT)
       }
       const communityCategory=new CommunityCategory({...req.body})
       await communityCategory.save();
       response.success(req,res,{message:"Community Category successfully created",data:communityCategory},HttpStatus.OK)
    }
    catch(err){
        next(err);
    }      
}

const createCommunity = async (req,res,next) => {
    try{
       const com= await Community.findOne({title:req.body.title,category:req.body.category})
       if(com)
       {
       return response.error(req,res,{message:"Community already exists"},HttpStatus.CONFLICT)
       }
       const community=new Community({...req.body})
       await community.save();
       response.success(req,res,{message:"Community  successfully created",data:community},HttpStatus.OK)
    }
    catch(err){
        next(err);
    }
       
}

const getCommunityCategories = async (req,res,next) => {
    try{
    const communityCategories=await CommunityCategory.aggregate([{$lookup:{from:"communities",localField:"_id",foreignField:"category",as:"communities"}}])
    response.success(req,res,{message:"Success",data:communityCategories},HttpStatus.OK)
    }
    catch(err){
        next(err)
    }
}

const updateUserCommunity = async (req,res,next) => {
    try{
        const userCommunity= new UserCommunity({...req.body})
        await userCommunity.save()
        response.success(req,res,{message:"User Community Created",data:userCommunity},HttpStatus.OK)
    }
    catch(err){
        next(err)
    }
   

}
module.exports={createCommunityCategory,createCommunity,getCommunityCategories,updateUserCommunity}