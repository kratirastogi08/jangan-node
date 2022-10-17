const User = require("../model/User");
var accountSid = "ACec8f8020dea24a97ee4dfceef7f48df3"; // Your Account SID from www.twilio.com/console
var authToken = "cf271e30658a0a6d6913121485509744"; // Your Auth Token from www.twilio.com/console
const response=require('../helper/CommonResponse');
const HttpStatus = require('http-status');
const { generateJwtToken } = require("../middlewares/authentication");



const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

const userObj = {
  updateUser: async (req, res,next) => {
    try {
      let updatedUser;
      const user=await User.findOne({_id:req.data._id})
       if(user?.stage===1)
      updatedUser= await User.findOneAndUpdate({_id:req.data._id},{$set:{stage:2,...req.body}},{new:true})
      else if(user?.stage===2)
      {
      const {viewPointIds}=req.body;
      viewPointIds.forEach(async(id)=>{
        await User.updateOne({ _id: req.data._id }, { $addToSet: { viewPoints: id }}).then((data)=>{
          console.log(data)
        }).catch(err=>{
           console.log(err)
        })   
      })
      updatedUser= await User.findOneAndUpdate({_id:req.data._id},{$set:{stage:3}},{new:true})
      }   
     return response.success(req,res,{message:"User details successfully added",stage:updatedUser?.stage},HttpStatus.OK)
    } catch (err) {
      next(err)
    }
  },

  phoneAuth: async (req,res,next) => {
    try{ const {phno}=req.body
         let OTP = "12334";
            client.messages
              .create({
                body: `Your OTP is ${OTP} `,
                from: "+16403446203",
                to: phno,
              })
              .then((message) => console.log(message))
              .catch((err) => console.log(err));
            const user = await User.findOne({ phno });
            if (!user) {
              const us = new User({
                phno,
                otp:OTP
              });
              await us.save();
            } 
            else{
             return response.error(req,res,{message:"Phone no already exists"},HttpStatus.CONFLICT)
            }
            return response.success(req,res,{message:"Success",stage:user?.stage ?? 0},HttpStatus.OK)   
    }
    catch(err){
       next(err)
    }
   
  },
  verifyOTP: async (req, res,next) => {
    try{
        const user = await User.findOne({ phno: req.body.phno });
        const {phno, otp } = req.body;
        if (String(otp) === user?.otp && user?.phno === phno) {
          const token =  generateJwtToken({
            _id: user._id
         }) 
         if(user?.stage==0)
         updatedUser=  await User.findOneAndUpdate({phno:phno},{$set:{token:token,stage:1}},{new:true})
         else
         updatedUser=await User.findOneAndUpdate({phno:phno},{$set:{token:token,stage:user?.stage}},{new:true})
         return response.success(req,res,{message:"OTP successfully verified",stage:updatedUser?.stage},HttpStatus.OK)
        } else {
          return response.error(req,res,{message:"OTP validation failed"},HttpStatus.CONFLICT)
        }
    }
    catch(err){
        next(err)
    }
   
  },
  updateUserVP:async(req,res,next)=>{
    try{
       const {userId,viewPointIds}=req.body
       viewPointIds.forEach(async(id)=>{
         await User.updateOne({ _id: userId }, { $addToSet: { viewPoints: id }}).then((data)=>{
           
         }).catch(err=>{
            console.log(err)
         })   
       })
     const user= await User.findByIdAndUpdate({ _id: userId},{$set:{stage:3}},{new:true})
     return response.success(req,res,{message:"Success",stage:user?.stage},HttpStatus.OK)
    }
    catch(err){
        next(err)
    }
  },
};

module.exports = userObj;
