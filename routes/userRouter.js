const express = require('express');
const router = express.Router();
const {validate}= require('../middlewares/validation')
const {phnoAuthSchema,updateUserSchema,verifyOTPSchema,addUserVPSchema}=require('../helper/validationSchema')
const userController=require('../controller/userController')
const {authentication}= require('../middlewares/authentication')
router.put("/updateUser",authentication,validate(updateUserSchema),userController.updateUser)
router.post("/phoneAuthentication",validate(phnoAuthSchema),userController.phoneAuth)
router.patch("/verifyOTP",validate(verifyOTPSchema),userController.verifyOTP)
router.patch("/updateUserVP",authentication,validate(addUserVPSchema),userController.updateUser)
module.exports=router