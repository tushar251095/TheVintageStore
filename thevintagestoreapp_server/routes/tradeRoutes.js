const express = require("express");
const controller = require("../controllers/tradeController");
const router= express.Router()
const {validateProduct,validateResult}= require('../middleware/validator')
const jwt = require('../middleware/jwt')
const {idValidator} = require('../middleware/validator')

//--------------------------------------open routes------------------------------------------

//API for categories page
router.get("/categories",controller.categories);

//API for product details page(requires product_id in request body)
router.get("/:id",idValidator,controller.productdetails);

//API to view all items on More items page
router.get("/moreitems/:id/:startingIndex/:endingIndex",idValidator, controller.moreitems);

//api to get categories object for dropdownlist
router.get("/categories/names", controller.dropdownlisttrades);

//api to add category
router.post("/add/category",controller.addcategory);

//api to delete category
router.delete("/delete/category/:id",idValidator, controller.deletecategory);

//api to find cattegory
router.get("/find/catrgory/:id",idValidator, controller.findcategory);

//api to edit category by id
router.put("/edit/catrgory", controller.updatecategory);

//api to view most searched product
router.get("/product/mostviewed", controller.mostSearched);

//--------------------------------------------restricted routes---------------------------

//api to add new trade in product_data
router.post("/add/trade",jwt.verifyToken,validateProduct,validateResult, controller.addnewtrade);

//api to delete trade
router.delete("/product/delete/:id",idValidator,jwt.isAuthor, jwt.verifyToken,controller.deletetrade);

//API to view all items on edit page
router.get("/view/allproduct/:startingIndex/:endingIndex",jwt.verifyToken, controller.viewall);

//API to Update trade in product_data
router.put("/update/trade/:id", idValidator,jwt.verifyToken,jwt.isAuthor,validateProduct,validateResult,controller.updatetrade);

//API to get products using userid
router.get("/users/products", jwt.verifyToken,controller.productByUserID);

//API to save trade
router.post("/trading/request", jwt.verifyToken,controller.saveTrade);

//API to get trade history
router.get("/trading/history", jwt.verifyToken,controller.tradeHistory);

//API to get trade offers
router.get("/trading/offers", jwt.verifyToken,controller.tradeOffers);

//API to get trade offers
router.post("/trading/update/offer", jwt.verifyToken,controller.acceptRejectStatus);
module.exports=router;

//API to cancel trade offers
router.get("/trading/cancel/offer/:id", jwt.verifyToken,controller.cancelTrade);
module.exports=router;

//API to get recommended trade offers
router.get("/trading/confirmation/:id", jwt.verifyToken,idValidator,controller.getRecommendedProducts);
module.exports=router;