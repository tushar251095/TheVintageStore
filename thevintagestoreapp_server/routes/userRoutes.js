const express = require('express');
const {loginLimiter} = require('../middleware/rateLimiter')
const controller = require('../controllers/userController');
const {validateSignUp,validateLogIn,validateResult}= require('../middleware/validator')
const router = express.Router();
//const {isGuest,isLoggedIn }= require('../middleware/auth');
const jwt = require('../middleware/jwt')

//-----------------------------------------Open routes--------------------------------------

//POST /users: create a new user account
router.post('/new',jwt.isGuest,validateSignUp,validateResult,controller.create);

//POST /users/login: authenticate user's login
router.post('/login', jwt.isGuest,loginLimiter,validateLogIn,validateResult,controller.login);


//---------------------------------------restricted routes--------------------------------

//GET /users/profile: send user's profile page
router.get('/profile', jwt.verifyToken,jwt.isLoggedIn,controller.profile);

//GET /users/profile: send user's profile page
router.post('/watchlist', jwt.verifyToken,jwt.isLoggedIn,controller.addToWatchList);

//GET /users/profile: send user's profile page
router.get('/watchlist', jwt.verifyToken,jwt.isLoggedIn,controller.getWatchList);

//GET /users/profile: send user's profile page
router.post('/watchlist/remove', jwt.verifyToken,jwt.isLoggedIn,controller.removefromWatchList);

//POST /users/logout: logout a user
//router.get('/logout',jwt.isLoggedIn, controller.logout);

module.exports = router;