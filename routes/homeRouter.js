"use strict";
const path = require('path');
const router = require('express').Router();
const homeController = require('../controllers/homeController');

const addToken = require('../middlewares/add/addToken');
const checkValidationErrors = require('../middlewares/check/checkValidationErros');
const checkToken = require('../middlewares/check/checkToken');

// validations
const validateSignUp = require('../middlewares/validation/validateSignUp');
const validateLogin = require('../middlewares/validation/validateLogin');

// configs
router.use((req,res,next) =>{
    req.app.set("views", path.join(__dirname, "../views/home"));
    req.app.set(
      "layout",
      path.join(__dirname, "../views/layouts/homeLayout.ejs")
    );
  next();
})

// middlewares

router.use(addToken);

// check is user loged in
router.use((req,res,next) =>{
    if(req.session.email) return res.redirect('/user');
    return next();
})

// routes
router.route('/').get(homeController.index);
router.route('/login').get(homeController.login).post(validateLogin,checkValidationErrors,checkToken,homeController.loginPOST);
router.route('/sign-up').get(homeController.signUp).post(validateSignUp,checkValidationErrors,checkToken,homeController.signUpPOST);




module.exports = router;