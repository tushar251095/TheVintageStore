const express = require("express");
const controller = require("../controllers/tradeController");
const router= express.Router()


//API for categories page
router.get("/categories",controller.categories);

//API for product details page(requires product_id in request body)
router.get("/:product_id",controller.productdetails);

//API to view all items on More items page
router.post("/moreitems", controller.moreitems);

//api to add new trade in product_data
router.post("/add/trade", controller.addnewtrade);

//api to get categories object for dropdownlist
router.get("/categories/names", controller.dropdownlisttrades);

//api to add category
router.post("/add/category",controller.addcategory);

//api to delete trade
router.delete("/product/delete/:product_id", controller.deletetrade);

//api to delete category
router.delete("/delete/category/:category_id", controller.deletecategory);

//API to view all items on edit page
router.get("/view/allproduct/:startingIndex/:endingIndex", controller.viewall);

//API to Update trade in product_data
router.put("/update/trade", controller.updatetrade);

//api to find cattegory
router.get("/find/catrgory/:category_id", controller.findcategory);

//api to edit category by id
router.put("/edit/catrgory", controller.updatecategory);

//api to edit category by id
router.get("/product/mostviewed", controller.mostSearched);



module.exports=router;