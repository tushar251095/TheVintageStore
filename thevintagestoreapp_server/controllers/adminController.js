const { Category, Product } = require("../model/tradeModel");
//const Trade = require("../model/trades");
//const user = require("../model/user");
let errorMsg = "cannot find the requested resource URL: ";
//const { v4: uuidv4 } = require("uuid");
//const jwt=require("../middleware/jwt");

//API to update Category by id
exports.updatecategory = (req, res, next) => {
    let updatedCategory = req.body;
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

  //api to delete category
exports.deletecategory = (req, res, next) => {
    let category_id = req.params.id;
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