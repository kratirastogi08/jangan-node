const response=require("../helper/CommonResponse")
const httpStatus = require('http-status');
const Joi = require('joi');
const validate=(schema,source = 'body')=>async(req,res,next)=>{
    try {
        const data = req[source];
        console.log(data)
        const { error } = Joi.validate(data,schema,{abortEarly: false});
        const valid = error == null;
        if (valid) {
          return next();
        } else {
          const { details } = error;
          const message = details.map((i) => i.message).join(',');
          return response.error(req, res, {message}, httpStatus.BAD_REQUEST);
        }
      } catch (error) {
        console.log('Error', error);
        return response.error(req, res, { message: 'INTERNAL_SERVER_ERROR'}, httpStatus.INTERNAL_SERVER_ERROR);
      }
}

module.exports={validate}