const { Category, Product } = require("../model/tradeModel");
const Trade = require("../model/trades");
const user = require("../model/user");
let errorMsg = "cannot find the requested resource URL: ";
const { v4: uuidv4 } = require("uuid");
const jwt=require("../middleware/jwt");
//API for categories page
exports.categories = (req, res, next) => {
  Category.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: 'category_id',
        foreignField: 'category_id',
        as: 'subtype'
      }
    },
    {
      $unwind:{
        path:"$subtype"
      }
    },
    {
      $match:{
        "subtype.product_status":"Available"
      }
    },
    {
      $group:{
        _id: "$category_id",
        category_id: { $first: "$category_id" },
        imageurl: { $first: "$imageurl" },
        title: { $first: "$title" },
        subtype: { $push: "$subtype" }
      }
    },
    {
      $project:{
        category_id:1,
        imageurl:1,
        title:1,
        subtype: { $slice: ["$subtype", 3] }
      }
    },
    {
      $sort:{title:1}
    }
  ])
    .then((categories) => {
      res.send(categories);
    })
    .catch((err) => {
      next(err);
    });
};

//API for product details page
exports.productdetails = (req, res, next) => {
  let product_id = req.params.id;
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
                  response.tradedetails=[]
                  response.watchlist=false
                  
                 if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[1]!=='null'){
                  let userinfo=jwt.decodeJWT(req.headers.authorization.split(' ')[1])
                  response.liked=product[0].like.includes(userinfo.id)
                  response.disliked=product[0].dislike.includes(userinfo.id)
                  Promise.all([Trade.find({buyer_id:userinfo.id,requested_product_id:product_id}),user.find({_id:userinfo.id,watchlist:product_id},{watchlist:1})])
                    .then((data)=>{
                          if(data[0].length>0){
                            response.tradedetails=data[0];
                          }
                          if(data[1].length>0){
                            response.watchlist=true
                          }
                          res.send(response);
                    })
                    .catch(err=>next(err))
                 }else{
                  response.tradedetails=[]
                  res.send(response);
                 }
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
  let category_id = req.params.id;
  let startingIndex = parseInt(req.params.startingIndex);
  let endingIndex = parseInt(req.params.endingIndex);
  let finalresponsoe = {};
  Product.find({ category_id: category_id,product_status:"Available" }).sort({prod_name:1}).skip(startingIndex).limit(endingIndex)
    .then((products) => {
      if(products.length>0){
        Category.find({ category_id: category_id })
        .then((result) => {
          Product.find({ category_id: category_id,product_status:"Available" }).count()
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
 req.body.product_id = uuidv4();
 let token=req.headers.authorization.split(' ')[1]
 let userinfo=jwt.decodeJWT(token)
 
 req.body.seller_id=userinfo.id;
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
      res.send("SUCCESS");
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.status = 400;
      }
      next(err);
    });
    }
  })
  .catch(err=>{
    next(err)
  })
};

//api to delete trade
exports.deletetrade = (req, res, next) => {
  let product_id = req.params.id;
Promise.all([Product.deleteOne({product_id:product_id}),Trade.updateMany({requested_product_id:product_id,status:"pending"},{$set:{status:"rejected"}}),Trade.updateMany({offered_product_id:product_id,status:"pending"},{$set:{status:"rejected"}})]) 
  .then(result=>{
    if (result[0].deletedCount==1) {
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



//API to view all items on edit page
exports.viewall = (req, res) => {
  let response={}
  let startingIndex = parseInt(req.params.startingIndex);
  let endingIndex = parseInt(req.params.endingIndex);
  let userinfo=jwt.decodeJWT(req.headers.authorization.split(' ')[1])
 
  Product.find({seller_id:userinfo.id,product_status:"Available"}).sort({prod_name:1}).skip(startingIndex).limit(endingIndex)
  .then(products=>{
    Product.find({seller_id:userinfo.id,product_status:"Available"}).count()
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
  let category_id = req.params.id;
  Category.find({ category_id: category_id })
    .then((resopnse) => {
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

//API for most serached products
exports.mostSearched = (req, res, next) => {
  Product.find({product_status:"Available"})
    .sort({ view_count: -1 })
    .limit(4)
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      next(err);
    });
};

//API for products by userid
exports.productByUserID = (req, res, next) => {
  let token=req.headers.authorization.split(' ')[1]
  let userinfo=jwt.decodeJWT(token)
 Trade.find({buyer_id:userinfo.id})
 .then((result)=>{
   let unavailableTrades=[]
   if(result.length>0){
     for(let i=0;i<result.length;i++){
           if(result[i].status=='pending' || result[i].status=='accepted')
          unavailableTrades.push(result[i].offered_product_id); 
     }
   }
   Product.find({seller_id:userinfo.id,product_id: { $nin: unavailableTrades },product_status:"Available" })
   .then((products) => {
     res.send(products);
   })
   .catch((err) => {
     next(err);
   });
  
 })
 .catch(err=>next(err))
};


//api to make/save trade request
exports.saveTrade = (req, res, next) => {
  let token=req.headers.authorization.split(' ')[1]
  let userinfo=jwt.decodeJWT(token)
   let addproduct = new Trade(req.body);
   addproduct
     .save()
     .then((data) => {
       user.updateOne({_id:userinfo.id},{$pull:{watchlist:req.body.requested_product_id}})
       .then(result=>{
          if(result.acknowledged==true){
            res.send(data)
          }else{
            res.send(null);
          }
       })
       .catch(err=>next(err))
      
     })
     .catch((err) => {
       if (err.name === "ValidationError") {
         err.status = 400;
       }
       next(err);
     });
 };

 exports.tradeHistory=(req,res,next)=>{
  let token=req.headers.authorization.split(' ')[1]
  let userinfo=jwt.decodeJWT(token)
  
  Trade.find({$or:[{buyer_id:userinfo.id},{$and:[{seller_id:userinfo.id},{$or:[{status:"accepted"},{status:"rejected"}]}]}]}).sort({createdAt:-1})
  //Trade.find({buyer_id:userinfo.id})
  .then((trades)=>{
        res.send(trades)
  })
 .catch(err=>next(err))

 }

 exports.tradeOffers=(req,res,next)=>{
  let token=req.headers.authorization.split(' ')[1]
  let userinfo=jwt.decodeJWT(token)
  Trade.find({$and:[{seller_id:userinfo.id},{status:"pending"}]}).sort({createdAt:-1})
  //Trade.find({buyer_id:userinfo.id})
  .then((trades)=>{
        res.send(trades)
  })
 .catch(err=>next(err))

 }

 exports.acceptRejectStatus=(req,res,next)=>{
  Trade.updateOne({_id:req.body._id},{$set:{status:req.body.status}})
  .then((result)=>{
    if(result.acknowledged==true && req.body.status=="accepted"){
      Product.updateMany({$or:[{product_id:req.body.offered_product_id},{product_id:req.body.requested_product_id}]},{$set:{product_status:"Not Available"}})
      .then(result2=>{
       // Trade.updateMany({$or:[{requested_product_id:req.body.requested_product_id},{offered_product_id:req.body.offered_product_id}],status:"pending"},{$set:{status:"rejected"}})
        Promise.all([Trade.updateMany({requested_product_id:req.body.requested_product_id,status:"pending"},{$set:{status:"rejected"}}),Trade.updateMany({offered_product_id:req.body.offered_product_id,status:"pending"},{$set:{status:"rejected"}}),Trade.updateMany({requested_product_id:req.body.offered_product_id,status:"pending"},{$set:{status:"rejected"}}),Trade.updateMany({offered_product_id:req.body.requested_product_id,status:"pending"},{$set:{status:"rejected"}})])
        .then((data)=>{
            res.send(true)
        })
        .catch(err=>next(err))
      })
     .catch(err=>next(err))
    }else{
      if(req.body.status=="rejected"){
        res.send(true)
      }else{
        res.send(false)
      }
      
    }
  })
 .catch(err=>next(err))

 }

 exports.cancelTrade=(req,res,next)=>{
  let id=req.params.id
  Trade.updateOne({_id:id},{$set:{status:"cancelled"}})
  .then(result=>{
    if(result.acknowledged==true){
      res.send(true)
    }else{
      res.send(false)
    }
  })
  .catch(err=>next(err))
 }

 exports.recommendedProduct=(req,res,next)=>{
  let id=req.params.id
  Trade.updateOne({_id:id},{$set:{status:"cancelled"}})
  .then(result=>{
    if(result.acknowledged==true){
      res.send(true)
    }else{
      res.send(false)
    }
  })
  .catch(err=>next(err))
 }

 exports.getRecommendedProducts=(req,res,next)=>{
  let id=req.params.id
  Product.find({product_id:id})
  .then(result=>{
    Product.find({category_id:result[0].category_id})
    .then(response=>{
       res.send(response)
    })
  })
 }

 exports.likeDislike=(req,res,next)=>{
    let token=req.headers.authorization.split(' ')[1]
    let userinfo=jwt.decodeJWT(token)
    let product_id=req.body.product_id
    let decision=req.body.decision

    Product.find({product_id:product_id})
    .then(result=>{
      //console.log(result)
       let liked=result[0].like.includes(userinfo.id)
       let disliked=result[0].dislike.includes(userinfo.id)

       if((decision=="like"&&liked==true) || (decision=="dislike" && disliked==true)){
        Product.updateOne({product_id:product_id},{$pull:{[decision]:userinfo.id}})
        .then(data=>{
          res.send("updated")
        })
        .catch(err=>next(err))
       }else if((decision=="dislike" && liked==true)){
            Promise.all([Product.updateOne({product_id:product_id},{$push:{[decision]:userinfo.id}}),Product.updateOne({product_id:product_id},{$pull:{'like':userinfo.id}})])
            .then(()=>{
              res.send('updated')
            })
            .catch(err=>next(err))
       }else if((decision=="like" && disliked==true)){
        Promise.all([Product.updateOne({product_id:product_id},{$push:{[decision]:userinfo.id}}),Product.updateOne({product_id:product_id},{$pull:{'dislike':userinfo.id}})])
        .then(()=>{
          res.send('updated')
        })
        .catch(err=>next(err))
       }else if((decision=="like"&&liked==false) || (decision=="dislike" && disliked==false)){
        Product.updateOne({product_id:product_id},{$push:{[decision]:userinfo.id}})
        .then(data=>{
          res.send("updated")
        })
        .catch(err=>next(err))
       }

    })
 };

 exports.postComment=(req,res,next)=>{
  let token=req.headers.authorization.split(' ')[1]
  let userinfo=jwt.decodeJWT(token)

  let comment=req.body
  comment.username=userinfo.firstName+" "+userinfo.lastName
  comment.userid=userinfo.id
  let product_id=req.body.product_id;
  comment.postedAt=Date.now()
  comment.id=uuidv4()
  Product.updateOne({product_id:product_id},{$push:{comments:comment}})
  .then(result=>{
    if(result.acknowledged==true){
      res.send(true)
    }else{
      res.send(false)
    }
  })
  .catch(err=>next(err))
 }

 exports.getComments=(req,res,next)=>{
   let product_id=req.params.id
   Product.find({product_id:product_id},{comments:1}).sort()
   .then((result)=>{
     res.send(result[0].comments.reverse())
   })
 }

 exports.deleteComment=(req,res,next)=>{
  let id=req.body.id
  let product_id=req.body.product_id
  Product.updateOne({product_id:product_id},{$pull:{comments:{id:id}}})
  .then((result)=>{
    if(result.acknowledged==true){
      res.send(true)
    }else{
      res.send(false)
    }
    
  })
}

exports.editComment=(req,res,next)=>{
  console.log(req.body)
  let id=req.body.id
  let product_id=req.body.product_id
  let comment=req.body.comment
  Product.updateOne({product_id:product_id,"comments.id":id},{$set:{"comments.$.comment":comment}})
  .then((result)=>{
    if(result.acknowledged==true){
      res.send(true)
    }else{
      res.send(false)
    }
    
  })
}

