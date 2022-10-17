const ViewPointCategory=require('../model/ViewPointCategory')
const ViewPoint = require('../model/ViewPoint');
const response = require('../helper/CommonResponse')
const HttpStatus = require('http-status');

const viewPointCategory = {
    addVPCategory:async(req,res,next)=>{
        try{ 
            const vpcat=await ViewPointCategory.findOne({categoryName:req.body.categoryName})
            if(vpcat){
                return response.error(req,res,{message:"ViewPointCategory already exists"},HttpStatus.CONFLICT)
            }
            const viewPointCategory= await ViewPointCategory.insertMany([req.body])

            response.success(req,res,{message:"View Point Category successfully added",data:viewPointCategory},HttpStatus.OK)
        }
        catch(err){
            next(err)
        }
    },
    addViewPoint:async(req,res,next)=>{
        try{
            const vp=await ViewPoint.findOne({categoryName:req.body.categoryName})
            if(vp){
                return response.error(req,res,{message:"ViewPoint already exists"},HttpStatus.CONFLICT)
            }
          const viewPoint=  await ViewPoint.insertMany([
                {
                    viewPointName:req.body.viewPointName,
                    category:req.body.categoryId
                }]
            )
            response.success(req,res,{message:"View Point successfully added",data:viewPoint},HttpStatus.OK)
        }
        catch(err){
            next(err)
        }
       
    },
    showViewPointCategoryList: async (req,res,next) => {
        try{
            const categories= await ViewPointCategory.aggregate([{$lookup:{from:"viewpoints",localField:"_id",foreignField:"category",as:"viewpoints"}}])
            response.success(req,res,{message:"Success",data:categories},HttpStatus.OK)
        }
        catch(err){
         next(err)
        }
    },
}
module.exports=viewPointCategory;