const jwt = require("jsonwebtoken");
User = require("../model/user");
const { Category, Product}=require('../model/tradeModel')
const secretKey = "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";

exports.generateToken=(data)=>{
    return jwt.sign(data,secretKey,{ expiresIn: '86400s' });
}
exports.verifyToken = (req, res, next) => {
   // console.log("in"+req.headers.authorization)
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      //console.log(req.headers.authorization.split(' ')[1])
    jwt.verify(req.headers.authorization.split(' ')[1],secretKey, function (err, decode) {
        if (err){
            let err1 = new Error(err.message);
            err1.status = 401;
            return next(err1);
        }
      User.findOne({
          _id: decode.id
        })
        .then(result=>{
            if(result){
                if(result._id==decode.id){
                   // console.log("success")
                    next();
                }else{
                    let err = new Error('Unauthorized user');
                    err.status = 401;
                    return next(err);
                }
            }
        })
       
    });
  }
};

exports.decodeJWT=(token)=>{
    let userinfo={}
    let err1=null;
    jwt.verify(token,secretKey, function (err, decode) {
        //console.log(decode)
       // console.log("error"+err)
       err1=err;
       userinfo.firstName=decode.firstName
       userinfo.lastName=decode.lastName
       userinfo.id=decode.id
    })
    return err1,userinfo;
}

exports.isGuest=(req,res,next)=>{
    console.log(req.headers.authorization.split(' ')[1])
    if(req.headers.authorization.split(' ')[1]!=null){
        return  next();
    }else{
        let err = new Error('ALready logged in');
        err.status = 400;
        return next(err);
    }
}

exports.isLoggedIn=(req,res,next)=>{
    if(req.headers.authorization.split(' ')[1]!=null){
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
            let jwterror,userinfo=this.decodeJWT(req.headers.authorization.split(' ')[1])
            if(jwterror!=null){
              let err= new Error('Unauthorized access');
              err.status=401;
              return next(err);
            }
             if(trade[0].seller_id==userinfo.id){
                 return next();
             }else{
                 let err= new Error('Unauthorized access');
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
              let jwterror,userinfo=this.decodeJWT(req.headers.authorization.split(' ')[1])
              if(jwterror!=null){
                let err= new Error('Unauthorized access to the resource');
                err.status=401;
                return next(err);
              }
              if(trade[0].seller_id==userinfo.id){
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