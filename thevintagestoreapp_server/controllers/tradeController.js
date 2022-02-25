const model=require("../model/tradeModel")

const Product_data= model.Product_data()
const Categories=model.Categories()

//API for categories page
exports.categories = (req, res) => {

  let temp_categories = [];
  temp_categories = Categories;
  for (let i = 0; i < Categories.length; i++) {
    var result = Product_data.filter((obj) => {
      return (
        obj.category_id === Categories[i].category_id &&
        obj.product_status == "available"
      );
    }).map((obj) => ({ prod_name: obj.prod_name, product_id: obj.product_id }));
    temp_categories[i].subtype = result.slice(0, 3);
  }

  res.send(temp_categories);
};

//API for product details page(requires product_id in request body)
exports.productdetails = (req, res) => {
  var index_of_object=FIndByID(req.params.product_id,Product_data,"product_id");
  Product_data[index_of_object].view_count=Product_data[index_of_object].view_count+1;
  var result=[];
  result.push(Product_data[index_of_object])
  console.log(result)
  var index_of_object1=FIndByID(result[0].category_id,Categories,"category_id");
  result[0].category_name=Categories[index_of_object1].title;
  res.send(result);
};

//API to view all items on More items page
exports.moreitems = (req, res) => {
  var MoreItems = Product_data.filter((obj) => {
    return obj.category_id === req.body.category_id;
  })
    .map((obj) => ({
      product_img_url: obj.product_img_url,
      prod_name: obj.prod_name,
      ratings: obj.ratings,
      year: obj.year,
      product_id: obj.product_id,
    }))
    .slice(req.body.startingIndex, req.body.endingIndex + 1);
  var result = Categories.filter((obj) => {
    return obj.category_id === req.body.category_id;
  }).map((obj) => ({
    category_name: obj.title,
  }));
  result[0].arraySize = Categories.length;
  MoreItems.push(result[0]);
  // console.log(MoreItems)
  res.send(MoreItems);
};

//api to add new trade in product_data
exports.addnewtrade = (req, res) => {
  var counter = Product_data.length;
  Product_data.push({
    prod_name: req.body.prod_name,
    product_id: ++counter,
    category_id: req.body.category_id,
    year: parseInt(req.body.year),
    seller: req.body.seller,
    seller_id: 2,
    ratings: 0,
    description: req.body.description,
    product_img_url: req.body.product_img_url,
    product_status: "available",
    view_count:0
  });
  res.send(Product_data[counter - 1]);
};

//api to get categories object for dropdownlist
exports.dropdownlisttrades = (req, res) => {
  var temp_categories = Categories.map((obj) => ({
    title: obj.title,
    category_id: obj.category_id,
  }));
  res.send(temp_categories);
};

//api to add category
exports.addcategory = (req, res) => {
  var counter = Categories.length;
  Categories.push({
    title: req.body.category_name,
    category_id: ++counter,
    imageurl: req.body.imageurl,
  });
  res.send(Categories[counter - 1]);
};

//api to delete trade
exports.deletetrade = (req, res) => {
  //handle error for wrong id
  insex_of_tarde = FIndByID(req.body.product_id, Product_data,"product_id");
  Product_data.splice(insex_of_tarde, 1);
  res.send(Product_data);
};

//api to delete category
exports.deletecategory = (req, res) => {
  //handle error for wrong id
  // console.log(req.body.category_id)
  insex_of_tarde = FIndByID(req.body.category_id, Categories,"category_id");
  // console.log(insex_of_tarde)
  Categories.splice(insex_of_tarde, 1);
  res.send("SUCCESS");
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
  var EditItems = Product_data.map((obj) => ({
    product_img_url: obj.product_img_url,
    prod_name: obj.prod_name,
    ratings: obj.ratings,
    year: obj.year,
    product_id: obj.product_id,
  })).slice(req.body.startingIndex, req.body.endingIndex + 1);
  EditItems.push({ arraySize: Product_data.length });
  // console.log(EditItems)
  res.send(EditItems);
};

//API to Update trade in product_data
exports.updatetrade = (req, res) => {
  var objindex = FIndByID(req.body.product_id, Product_data,"product_id");
  Product_data[objindex].prod_name = req.body.prod_name;
  Product_data[objindex].year = req.body.year;
  Product_data[objindex].product_img_url = req.body.product_img_url;
  Product_data[objindex].category_id = req.body.category_id;
  Product_data[objindex].description = req.body.description;
  res.send("SUCCESS");
};

exports.findcategory = (req, res) => {
  var index_of_object = Categories.findIndex(
    (obj) => obj.category_id == req.body.category_id
  );
  if (index_of_object == -1) {
    return false;
  } else {
    res.send(Categories[index_of_object]);
  }
};

exports.updatecategory = (req, res) => {
  var index_of_object = Categories.findIndex(
    (obj) => obj.category_id == req.body.category_id
  );
  if (index_of_object == -1) {
    return false;
  } else {
    Categories[index_of_object].title = req.body.title;
    Categories[index_of_object].imageurl = req.body.imageurl;
    res.send("SUCCESS");
  }
};

exports.mostviewed=(req,res)=>{
  var mostviewed=[...Product_data]
   mostviewed.sort(function(a,b){
    return b.view_count-a.view_count
  })
 .map((obj) => ({
      product_img_url: obj.product_img_url,
      prod_name: obj.prod_name,
      ratings: obj.ratings,
      year: obj.year,
      product_id: obj.product_id,
      view_count:obj.view_count
    }))
    ;
    res.send(mostviewed.slice(0,4))
}