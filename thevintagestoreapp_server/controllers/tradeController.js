const model=require("../model/tradeModel")

const Product_data= model.Product_data()
const Categories=model.Categories()

//API for categories page
exports.categories = (req, res) => {
  res.send(model.getAllCategories());
};

//API for product details page(requires product_id in request body)
exports.productdetails = (req, res) => {
  let product_id=req.params.product_id;
  res.send(model.getproductDetails(product_id));
};

//API to view all items for specific category
exports.moreitems = (req, res) => {
  let category_id=req.body.category_id
  let startingIndex=req.body.startingIndex
  let endingIndex=req.body.endingIndex
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
exports.deletetrade = (req, res) => {
  let product_id=req.params.product_id
  res.send(model.removeProduct(product_id));
};

//api to delete category
exports.deletecategory = (req, res) => {
  let category_id=req.params.category_id
  res.send(model.removeCategory(category_id));
};

//function to find object index by id
function FIndByID(id, dataArray,value) {
  index_of_object = dataArray.findIndex((obj) => obj[value] == id);
  if (index_of_object == -1) {
    return false;
  } else {
    return index_of_object;
  }
}

//API to view all items on edit page
exports.viewall = (req, res) => {
 let startingIndex=parseInt(req.params.startingIndex)
 let endingIndex=parseInt(req.params.endingIndex)
  res.send(model.getAllProducts(startingIndex,endingIndex));
};

//API to Update trade in product_data
exports.updatetrade = (req, res) => {
 let updatedTarde=req.body
  res.send(model.updateProductDetails(updatedTarde));
};

//api to finf category by id
exports.findcategory = (req, res) => {
  let category_id=req.params.category_id
  res.send(model.findCategoryByID(category_id));
};

//API to update Category by id
exports.updatecategory = (req, res) => {
  let updatedCategory=req.body
  res.send(model.updateCategoryByID(updatedCategory));
};

//API for most serached products
exports.mostSearched=(req,res)=>{
    res.send(model.mostViwedProduct())
}