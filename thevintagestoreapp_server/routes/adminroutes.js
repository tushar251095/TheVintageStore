const express = require("express");
const controller = require("../controllers/adminController");
const router= express.Router()
const {validateProduct,validateResult}= require('../middleware/validator')
const jwt = require('../middleware/jwt')
const {idValidator} = require('../middleware/validator')

//--------------------------------------open routes------------------------------------------


//--------------------------------------------restricted routes---------------------------
//api to edit category by id
router.put("/edit/catrgory",jwt.verifyToken, jwt.isAdmin,controller.updatecategory);

//api to delete category
router.delete("/delete/category/:id",jwt.verifyToken,jwt.isAdmin,idValidator, controller.deletecategory);

module.exports=router;


