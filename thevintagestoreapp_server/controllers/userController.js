const model = require("../model/user");
const jwtMiddleware = require("../middleware/jwt");
const user = require("../model/user");
const { Category, Product } = require("../model/tradeModel");

exports.create = (req, res, next) => {
  //res.send('Created a new story');
  req.body.email=req.body.email.toLowerCase()
  let user = new model(req.body);
  user
    .save()
    .then(() => res.send("SUCCESS"))
    .catch((err) => {
      if (err.name === "ValidationError") {
        let message = err.message;
        let err1 = new Error(message);
        err1.status = 400;
        return next(err1);
      } else if (err.code === 11000) {
        let err1 = new Error("Email has been used");
        err1.status = 400;
        return next(err1);
      } else {
        next(err);
      }
    });
};

exports.login = (req, res, next) => {
  let email = req.body.email.toLowerCase();
  let password = req.body.password;
  model
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        let err = new Error("wrong email address");
        err.status = 404;
        return next(err);
      } else {
        user.comparePassword(password).then((result) => {
          if (result) {
            // console.log(user);
            const userinfo = {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
            };
            const token = jwtMiddleware.generateToken(userinfo);
            //req.session.user = user._id;
            res.json({
              token,
              userinfo,
            });
          } else {
            let err = new Error("wrong password");
            err.status = 404;
            return next(err);
          }
        });
      }
    })
    .catch((err) => next(err));
};

exports.profile = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let userinfo = jwtMiddleware.decodeJWT(token);
 
  let id = userinfo.id;
  model
    .findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => next(err));
};

exports.addToWatchList = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let userinfo = jwtMiddleware.decodeJWT(token);
  let productid = req.body.product_id;
  user
    .updateOne({ _id: userinfo.id }, { $push: { watchlist: productid } })
    .then((result) => {
      if (result.acknowledged == true) {
        res.send(true);
      } else {
        res.send(false);
      }
    })
    .catch((err) => next(err));
};

exports.getWatchList = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let userinfo = jwtMiddleware.decodeJWT(token);
  user
    .find({ _id: userinfo.id }, { watchlist: 1 })
    .then((result) => {
      if (result) {
        Product.find({ product_id: { $in: result[0].watchlist } }).then(
          (produclist) => {
            if (produclist) {
              res.send(produclist);
            } else {
              let err = new Error("Something went wrong");
              err.status = 500;
              return next(err);
            }
          }
        )
        .catch(err=>next(err))
      } else {
        let err = new Error("Something went wrong");
        err.status = 500;
        return next(err);
      }
    })
    .catch((err) => err);
};


exports.removefromWatchList=(req,res,next)=>{
  let token = req.headers.authorization.split(" ")[1];
  let userinfo = jwtMiddleware.decodeJWT(token);
  user.updateOne({_id:userinfo.id},{$pull:{watchlist:req.body.product_id}})
  .then(result=>{
    if(result.acknowledged==true){
      return res.send(true)
    }else{
      return res.send(false)
    }
  })
  .catch(err=>next(err))
}
// exports.logout = (req, res, next) => {
//   req.session.destroy((err) => {
//     if (err) return next(err);
//     else res.send("logout");
//   });
// };
