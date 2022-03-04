const model=require("../model/tradeModel")

let errorMsg="cannot find the requested resource URL: "
//API for categories page
exports.categories = (req, res) => {
  res.send(model.getAllCategories());
};

//API for product details page(requires product_id in request body)
exports.productdetails = (req, res,next) => {
  let product_id=req.params.product_id;
  if(!model.getproductDetails(product_id)){
    let err = new Error(errorMsg+req.url);
    err.status = 404;
    next(err);
  }else{
    res.send(model.getproductDetails(product_id));
  }
 
};

//API to view all items for specific category
exports.moreitems = (req, res) => {
  let category_id=parseInt(req.params.category_id)
  let startingIndex=parseInt(req.params.startingIndex)
  let endingIndex=parseInt(req.params.endingIndex)
  res.send(model.allProductsforCategory(category_id,startingIndex,endingIndex));
};

//api to add new trade in product_data
exports.addnewtrade = (req, res) => {
  let newTrade=req.body
  res.send(model.saveNewTrade(newTrade));
};

//api to get categories object for dropdownlist
exports.dropdownlisttrades = (req, res) => {
  res.send(model.getCategoriesNames());
};

//api to add category
exports.addcategory = (req, res) => {
  let newCategory=req.body
  res.send(model.saveNewCategory(newCategory));
};

//api to delete trade
exports.deletetrade = (req, res,next) => {
  let product_id=req.params.product_id
  if(model.removeProduct(product_id)){
    res.send("SUCCESS")
  }else{
    let err = new Error(errorMsg+req.url);
    err.status = 404;
    next(err);
  } 
};

//api to delete category
exports.deletecategory = (req, res,next) => {
  let category_id=req.params.category_id
  if(model.removeCategory(category_id)){
    res.send("SUCCESS");
  }else{
    let err = new Error(errorMsg+req.url);
    err.status = 404;
    next(err);
  }
};

//API to view all items on edit page
exports.viewall = (req, res) => {
 let startingIndex=parseInt(req.params.startingIndex)
 let endingIndex=parseInt(req.params.endingIndex)
  res.send(model.getAllProducts(startingIndex,endingIndex));
};

//API to Update trade in product_data
exports.updatetrade = (req, res,next) => {
 let updatedTarde=req.body
 if(model.updateProductDetails(updatedTarde)){
  res.send("SUCCESS");
 }else{
  let err = new Error(errorMsg+req.url+"/"+updatedTarde.product_id);
  err.status = 404;
  next(err);
 }
 
};

//api to finf category by id
exports.findcategory = (req, res) => {
  let category_id=req.params.category_id
  res.send(model.findCategoryByID(category_id));
};

//API to update Category by id
exports.updatecategory = (req, res,next) => {
  let updatedCategory=req.body
  if(model.updateCategoryByID(updatedCategory)){
    res.send("SUCCESS");
  }else{
    let err = new Error(errorMsg+req.url+"/"+updatedCategory.category_id);
    err.status = 404;
    next(err);
  }
  
};

//API for most serached products
exports.mostSearched=(req,res)=>{
    res.send(model.mostViwedProduct())
}