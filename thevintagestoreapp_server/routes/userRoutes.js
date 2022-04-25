const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();
//const {isGuest,isLoggedIn }= require('../middleware/auth');
const jwt = require('../middleware/jwt')

//-----------------------------------------Open routes--------------------------------------

//POST /users: create a new user account
router.post('/new',jwt.isGuest,controller.create);

//POST /users/login: authenticate user's login
router.post('/login', jwt.isGuest,controller.login);

//---------------------------------------restricted routes--------------------------------

//GET /users/profile: send user's profile page
router.get('/profile', jwt.verifyToken,jwt.isLoggedIn,controller.profile);

//POST /users/logout: logout a user
//router.get('/logout',jwt.isLoggedIn, controller.logout);

module.exports = router;