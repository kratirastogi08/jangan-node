const jwt= require('jsonwebtoken');
const response= require('../helper/CommonResponse')
const httpStatus = require('http-status');
const User=require('../model/User')

const authentication=(req,res,next)=>{
    try{
     let token=req.headers.authorization;
     if(!token){
       response.error(req,res,{message:'MISSING TOKEN'},httpStatus.UNAUTHORIZED)
     }
     token = token.replace(/^Bearer\s+/, '');
     console.log("auth",token)
     jwt.verify(token,process.env.SECRET_KEY,async(error, decoded) =>{
        if (error) {
            console.log("error",error)
            return response.error(req, res, { message: 'INVALID TOKEN' }, httpStatus.UNAUTHORIZED);
          }else if (decoded._id == 0 || undefined || '') {
            return response.error(req, res, { message: 'USER NOT FOUND' }, httpStatus.UNAUTHORIZED);
         } else {
            const user = await User.findOne({token})
            if(user)
            {
                req.data={
                    _id:user._id,
                    token
                }
                return next()
            }
            else
            {
                return response.error(req, res, { message: 'TOKEN EXPIRED' }, httpStatus.UNAUTHORIZED);
            }
         }
     })
    }catch(err){
        next(err)
    }
}

const generateJwtToken=(data)=>{
    const options = { expiresIn: '1d' }
    return jwt.sign(data,process.env.SECRET_KEY, options)
}

module.exports={
  authentication,
  generateJwtToken
}
