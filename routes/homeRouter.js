"use strict";
const path = require('path');
const router = require('express').Router();
const homeController = require('../controllers/homeController');

const addToken = require('../middlewares/add/addToken');
const checkValidationErrors = require('../middlewares/check/checkValidationErros');
const checkToken = require('../middlewares/check/checkToken');
// validations
const validateSignUp = require('../middlewares/validation/validateSignUp');


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


// routes
router.route('/').get(homeController.index);
router.route('/login').get(homeController.login);
router.route('/sign-up').get(homeController.signUp).post(validateSignUp,checkValidationErrors,checkToken,homeController.signUpPOST);




module.exports = router;