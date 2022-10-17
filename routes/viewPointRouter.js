
const express=require('express');
const router=express.Router();
const viewPointController=require('../controller/viewPointController')
const {viewPointCategorySchema,viewPointSchema}=require('../helper/validationSchema')
const {validate}=require('../middlewares/validation')


router.post("/addVPCategory",validate(viewPointCategorySchema),viewPointController.addVPCategory)
router.post("/addVP",validate(viewPointSchema),viewPointController.addViewPoint)
router.get("/showVPCategoryList",viewPointController.showViewPointCategoryList)

module.exports=router

