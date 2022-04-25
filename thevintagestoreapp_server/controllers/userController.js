const model = require("../model/user");
const jwt = require("jsonwebtoken");
const jwtMiddleware=require("../middleware/jwt");
exports.create = (req, res, next) => {
  //res.send('Created a new story');
  let user = new model(req.body);
  user
    .save()
    .then(() => res.send("SUCCESS"))
    .catch((err) => {
      if (err.name === "ValidationError") {
        let message = err.message
        let err1 = new Error(message);
        err1.status = 400;
        return next(err1);
      }else if (err.code === 11000) {
        let err1 = new Error('Email has been used');
        err1.status = 400;
        return next(err1);
      }else{
        next(err);
      }
     
    });
};

exports.login = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  model
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        let err = new Error('wrong email address');
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
            const token = jwtMiddleware.generateToken(userinfo)
            //req.session.user = user._id;
            res.json({
              token,
              userinfo
            });
          } else {
            let err = new Error('wrong password');
            err.status = 404;
            return next(err);
          }
        });
      }
    })
    .catch((err) => next(err));
};

exports.profile = (req, res, next) => {
  let token=req.headers.authorization.split(' ')[1]
  let jwterror,userinfo=jwtMiddleware.decodeJWT(token)
  if(jwterror!=null){
    let err = new Error('Unauthorized access');
    err.status = 401;
    return next(err);
  }
  let id = userinfo.id;
  model
    .findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => next(err));
};

// exports.logout = (req, res, next) => {
//   req.session.destroy((err) => {
//     if (err) return next(err);
//     else res.send("logout");
//   });
// };
