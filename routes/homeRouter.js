"use strict";
const path = require("path");
const router = require("express").Router();
const homeController = require("../controllers/homeController");

//add
const addToken = require("../middlewares/add/addToken");

// checks
const checkValidationErrors = require("../middlewares/check/checkValidationErrors");
const checkToken = require("../middlewares/check/checkToken");
const checkLastMailTime = require("../middlewares/check/checkLastMailTime");
const checkVerifyHash = require("../middlewares//check/checkVerifyHash");

// validations
const validateSignUp = require("../middlewares/validation/validateSignUp");
const validateLogin = require("../middlewares/validation/validateLogin");
const validateForgetPassword = require("../middlewares/validation/validateForgetPassword");
const validateChangePassword = require("../middlewares/validation/validateChangePassword");

// mail
const generatePasswordMsg = require("../middlewares/mailer/generate/generatePasswordMsg");
const sendMail = require("../middlewares/mailer/sendMail");

// check is user loged in
router.use((req, res, next) => {
  if (req.session.isAuth) return res.redirect("/user");
  return next();
});

// configs
router.use((req, res, next) => {
  req.app.set(
    "layout",
    path.join(__dirname, "../views/layouts/homeLayout.ejs")
  );
  next();
});

// middlewares

router.use(addToken);

// routes

router
  .route("/change-password/:hash")
  .get(checkVerifyHash, homeController.changePassword)
  .post(
    validateChangePassword,
    checkValidationErrors,
    homeController.changePasswordPOST
  );

router
  .route("/forget-password")
  .get(homeController.forgetPassword)
  .post(
    validateForgetPassword,
    checkValidationErrors,
    checkLastMailTime,
    checkToken,
    generatePasswordMsg,
    sendMail,
    homeController.forgetPasswordPOST
  );

router
  .route("/login")
  .get(homeController.login)
  .post(
    validateLogin,
    checkValidationErrors,
    checkToken,
    homeController.loginPOST
  );

router
  .route("/sign-up")
  .get(homeController.signUp)
  .post(
    validateSignUp,
    checkValidationErrors,
    checkToken,
    homeController.signUpPOST
  );

router.route("/").get(homeController.index);
module.exports = router;
