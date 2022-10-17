const express= require('express');
const router= express.Router();
const communityController=require("../controller/communityController")
const {validate}=require("../middlewares/validation")
const {addCommunityCategorySchema,communitySchema}=require("../helper/validationSchema");
const { authentication } = require('../middlewares/authentication');

router.post('/createCommunityCategory',authentication,validate(addCommunityCategorySchema),communityController.createCommunityCategory)
router.post("/createCommunity",authentication,validate(communitySchema),communityController.createCommunity)
router.post("/createUserCommunity",authentication,communityController.updateUserCommunity)
router.get("/showCommunityCategoryList",authentication,communityController.getCommunityCategories)

module.exports=router;