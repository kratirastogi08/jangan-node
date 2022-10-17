const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); 
 
const phnoAuthSchema = Joi.object().keys({
    phno:Joi.string().regex(/^\+[0-9]{1,3}[0-9]{10}$/).required().empty('').error(errors => {
        errors.forEach(err => {
            console.log(err)
          switch (err.type) {
            case "string.regex.base":
              err.message = "Invalid phone number!";
              break;
            default:
              break;
          }
        });
        return errors;
      })
})
const verifyOTPSchema = Joi.object().keys({
    phno:Joi.string().regex(/^\+[0-9]{1,3}[0-9]{10}$/).required().empty('').error(errors => {
        errors.forEach(err => {
            console.log(err)
          switch (err.type) {
            case "string.regex.base":
              err.message = "Invalid phone number!";
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    otp:Joi.number().required().empty('')
})
const updateUserSchema = Joi.object().keys({
    firstName:Joi.string().required().empty(''),
    lastName:Joi.string().required().empty(''),
    dob:Joi.string().required().empty(''),
    state:Joi.string().required().empty(''),
    city:Joi.string().required().empty(''),
    phno:Joi.string().regex(/^\+[0-9]{1,3}[0-9]{10}$/).required().empty('').error(errors => {
        errors.forEach(err => {
            console.log(err)
          switch (err.type) {
            case "string.regex.base":
              err.message = "Invalid phone number!";
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    gender:Joi.string().required().empty('').valid('Male', 'male', 'Female', 'female', 'other', 'Other'),
})
const viewPointCategorySchema = Joi.object().keys({
    categoryName:Joi.string().required().empty(''),
})
const viewPointSchema = Joi.object().keys({
    viewPointName:Joi.string().required().empty(''),
    categoryId:Joi.required().empty('')
})
const addUserVPSchema = Joi.object().keys({
    userId:Joi.required().empty(''),
    viewPointIds:Joi.array().min(1).required()
})

const addCommunityCategorySchema = Joi.object().keys({
    categoryName:Joi.string().required().empty(''),
})
const communitySchema = Joi.object().keys({
    title:Joi.string().required().empty(''),
    category:Joi.objectId().required().empty(''),
    userId:Joi.objectId().required().empty(''),
    locations:Joi.array().min(1).required(),
    headquarters:Joi.array().min(1).required(),
    description:Joi.string().required().empty(''),
    activateDonation: Joi.boolean().optional(),
    isCommunityRegistered:Joi.boolean().optional(),
    isCommunityPrivate:Joi.boolean().optional(),
    photo:Joi.string().optional(),
    
})


module.exports={
    phnoAuthSchema,
    verifyOTPSchema,
    updateUserSchema,
    viewPointCategorySchema,
    viewPointSchema,
    addUserVPSchema,
    addCommunityCategorySchema,
    communitySchema
}