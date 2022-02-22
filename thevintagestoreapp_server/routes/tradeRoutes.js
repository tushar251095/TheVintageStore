const express = require("express");
const controller = require("../controllers/tradeController");
const router= express.Router()


//API for categories page
router.get("/trades",controller.categories);

//API for product details page(requires product_id in request body)
router.post("/trade",controller.productdetails);

//API to view all items on More items page
router.post("/moreitems", controller.moreitems);

//api to add new trade in product_data
router.post("/add/trade", controller.addnewtrade);

//api to get categories object for dropdownlist
router.get("/categories", controller.dropdownlisttrades);

//api to add category
router.post("/add/category",controller.addcategory);

//api to delete trade
router.post("/delete/trade", controller.deletetrade);

//api to delete category
router.post("/delete/category", controller.deletecategory);

//API to view all items on edit page
router.post("/view/allproduct", controller.viewall);

//API to Update trade in product_data
router.post("/update/trade", controller.updatetrade);

//api to find cattegory
router.post("/find/catrgory", controller.findcategory);

//api to edit category by id
router.post("/edit/catrgory", controller.updatecategory);


module.exports=router;