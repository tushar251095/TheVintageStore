const { Category, Product } = require("../model/tradeModel");
let errorMsg = "cannot find the requested resource URL: ";
const { v4: uuidv4 } = require("uuid");
//API for categories page
exports.categories = (req, res, next) => {
  Category.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "category_id",
        foreignField: "category_id",
        as: "subtype",
      },
    },
    {$sort:{title:1}},
    {
      $project: {
        title: 1,
        category_id: 1,
        imageurl: 1,
        subtype: { $slice: ["$subtype", 3] },
      },
    },
  ])
    .then((categories) => {
      res.send(categories);
    })
    .catch((err) => {
      next(err);
    });
};

//API for product details page(requires product_id in request body)
exports.productdetails = (req, res, next) => {
  let product_id = req.params.product_id;
  if(!product_id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)){
    let err = new Error('Invalid Story id');
    err.status = 400;
    return next(err);
}
  Product.find({ product_id: product_id })
    .then((product) => {
      if (product.length==0) {
        let err = new Error(errorMsg + req.url);
        err.status = 404;
        next(err);
      } else {
        Product.updateOne(
          { product_id: product_id },
          { $inc: { view_count: 1 } }
        )
          .then((r) => {
            Category.find({ category_id: product[0].category_id })
              .then((cat) => {
                if (cat) {
                  let response = {};
                  response.productdetails = product;
                  response.categorytitle = cat[0].title;
                  res.send(response);
                } else {
                  let err = new Error(errorMsg + req.url);
                  err.status = 404;
                  next(err);
                }
              })
              .catch((err) => {
                next(err);
              });
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      next(err);
    });
};

//API to view all items for specific category
exports.moreitems = (req, res, next) => {
  let category_id = req.params.category_id;
  if(!category_id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)){
    let err = new Error('Invalid Story id');
    err.status = 400;
    return next(err);
}
  let startingIndex = parseInt(req.params.startingIndex);
  let endingIndex = parseInt(req.params.endingIndex);
  let finalresponsoe = {};
  Product.find({ category_id: category_id }).sort({prod_name:1}).skip(startingIndex).limit(endingIndex)
    .then((products) => {
      console.log(products)
      if(products.length>0){
        Category.find({ category_id: category_id })
        .then((result) => {
          Product.find({ category_id: category_id }).count()
            .then((result1) => {
              finalresponsoe.products = products;
              let obj = {};
              obj.category_name = result[0].title;
              obj.arraySize = result1;
              finalresponsoe.others=obj
              res.send(finalresponsoe);
            })
            .catch((err) => {
              next(err);
            });
        })
        .catch((err) => {
          next(err);
        });
      }else{
        let err = new Error("Cannot find requested category");
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => {
      next(err);
    });
};

//api to add new trade in product_data
exports.addnewtrade = (req, res, next) => {
  console.log(req.body);
 req.body.product_id = uuidv4();
  let addproduct = new Product(req.body);
  addproduct
    .save()
    .then(() => {
      res.send(true);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.status = 400;
      }
      next(err);
    });
};

//api to get categories object for dropdownlist
exports.dropdownlisttrades = (req, res, next) => {
  Category.find({},{title:1,category_id:1})
    .then((categories) => {
      res.send(categories);
    })
    .catch((err) => {
      next(err);
    });
};

//api to add category
exports.addcategory = (req, res, next) => {
  //console.log(req.body);
  let newCategory = {};
  newCategory.title = req.body.category_name;
  newCategory.imageurl = req.body.imageurl;
  newCategory.category_id = uuidv4();
  Category.find({title:req.body.category_name}).collation({locale:'en', strength:2})
  .then((details)=>{
    if(details.length>0){
      res.send("Category already present");
    }else{
      let addCategory = new Category(newCategory);
  addCategory
    .save()
    .then(() => {
      //console.log(newCategory);
      res.send("SUCCESS");
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.status = 400;
      }
      next(err);
    });
    }
    console.log(details)
  })
  .catch(err=>{
    next(err)
  })
};

//api to delete trade
exports.deletetrade = (req, res, next) => {
  let product_id = req.params.product_id;
  if(!product_id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)){
    let err = new Error('Invalid Story id');
    err.status = 400;
    return next(err);
}
  Product.deleteOne({product_id:product_id})
  .then(result=>{
    if (result.deletedCount==1) {
      res.send("SUCCESS");
    } else {
      let err = new Error(errorMsg + req.url);
      err.status = 404;
      next(err);
    }
  })
  .catch(err=>{
    next(err)
  })
};

//api to delete category
exports.deletecategory = (req, res, next) => {
  let category_id = req.params.category_id;
  if(!category_id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)){
    let err = new Error('Invalid Story id');
    err.status = 400;
    return next(err);
}
  Category.deleteOne({category_id:category_id})
  .then(result=>{
    if (result.deletedCount==1) {
      Product.deleteMany({category_id:category_id})
      .then((restlt1)=>{
       if(restlt1.acknowledged==true){
        res.send("SUCCESS");
       }else {
        let err = new Error(errorMsg + req.url);
        err.status = 404;
        next(err);
      }
       
      })
      .catch(err=>{
        next(err)
      })
     
    } else {
      let err = new Error(errorMsg + req.url);
      err.status = 404;
      next(err);
    }
  })
  .catch(err=>{
    next(err)
  })
  
};

//API to view all items on edit page
exports.viewall = (req, res) => {
  let response={}
  let startingIndex = parseInt(req.params.startingIndex);
  let endingIndex = parseInt(req.params.endingIndex);
  Product.find().sort({prod_name:1}).skip(startingIndex).limit(endingIndex)
  .then(products=>{
    Product.find().count()
    .then(result=>{
      response.products=products
      response.arraySize=result
      res.send(response)
    })
    .catch((err) => {
      next(err);
    });
  })
  .catch((err) => {
    next(err);
  });
};

//API to Update trade in product_data
exports.updatetrade = (req, res, next) => {
  let updatedTarde = req.body;
  if(!updatedTarde.product_id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)){
    let err = new Error('Invalid Story id');
    err.status = 400;
    return next(err);
}
  Product.updateOne({product_id:updatedTarde.product_id},{
    $set:{
            prod_name : updatedTarde.prod_name,
            year : updatedTarde.year,
            product_img_url : updatedTarde.product_img_url,
            category_id : updatedTarde.category_id,
            description : updatedTarde.description
    }
  },{runValidators:true})
  .then(result=>{
    if (result.modifiedCount==1) {
       res.send("SUCCESS");
    } else {
      let err = new Error(errorMsg + req.url + "/" + updatedTarde.product_id);
      err.status = 404;
      next(err);
    }
  })
  .catch(err=>{
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    next(err)
  }) 
};

//api to find category by id
exports.findcategory = (req, res, next) => {
  let category_id = req.params.category_id;
  if(!category_id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)){
    let err = new Error('Invalid Story id');
    err.status = 400;
    return next(err);
}
  Category.find({ category_id: category_id })
    .then((resopnse) => {
      console.log(resopnse)
      if(resopnse.length>0){
        res.send(resopnse[0]);
      }else{
        let err = new Error("Cannot find requested Category");
      err.status = 404;
      next(err);
      }
      
    })
    .catch((err) => {
      next(err);
    });
};

//API to update Category by id
exports.updatecategory = (req, res, next) => {
  let updatedCategory = req.body;
  if(!updatedCategory.category_id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)){
    let err = new Error('Invalid Story id');
    err.status = 400;
    return next(err);
}
  Category.updateOne({category_id:updatedCategory.category_id},{$set:{
      title : updatedCategory.title,
      imageurl : updatedCategory.imageurl
  }},{runValidators:true})
  .then(result=>{
    if (result.modifiedCount==1) {
      res.send("SUCCESS");
    } else {
      let err = new Error(errorMsg + req.url + "/" + updatedCategory.category_id);
      err.status = 404;
      next(err);
    }
  })
  .catch(err=>{
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    next(err)
  })
  
};

//API for most serached products
exports.mostSearched = (req, res, next) => {
  Product.find()
    .sort({ view_count: -1 })
    .limit(4)
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      next(err);
    });
};
