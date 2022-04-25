const jwt = require("jsonwebtoken");
const { Category, Product}=require('../model/tradeModel')

exports.isGuest=(req,res,next)=>{
    console.log(req.headers.authorization)
    if(!req.session.user){
        return  next();
    }else{
        let err = new Error('ALready logged in');
            err.status = 400;
            return next(err);
    }
}

exports.isLoggedIn=(req,res,next)=>{
    if(req.session.user){
        return  next();
    }else{
        let err = new Error('You need to log in first');
        err.status = 400;
        return next(err);
    }
}

exports.isAuthor=(req,res,next)=>{
   product_id=req.body.product_id
   Product.find({product_id:product_id})
   .then(trade=>{
    console.log(trade)
        if(trade.length>0){
            if(trade[0].seller_id==req.session.user){
                return next();
            }else{
                let err= new Error('Unauthorized access to the resource');
                err.status=401;
                return next(err);
            }
        }
   })
   .catch(err=>next(err));
}

exports.isAuthorParam=(req,res,next)=>{
    product_id=req.params.product_id
    Product.find({product_id:product_id})
    .then(trade=>{
     console.log(trade)
         if(trade.length>0){
             if(trade[0].seller_id==req.session.user){
                 return next();
             }else{
                 let err= new Error('Unauthorized access to the resource');
                 err.status=401;
                 return next(err);
             }
         }
    })
    .catch(err=>next(err));
 }