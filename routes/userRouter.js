const path = require('path');
const router = require('express').Router();
const userController = require('../controllers/userController');


const sendValidateMail = require('../middlewares/mailer/sendValidateMail');

const checkToken = require('../middlewares/check/checkToken');
const checkLastMailTime = require('../middlewares/check/checkLastMailTime');
const checkVerifyUser = require('../middlewares/check/checkVerifyUser');
const checkVerifyHash = require('../middlewares/check/checkVerifyHash');
const addVerifyUser = require('../middlewares/add/addVerifyUser');


// configurations
router.use((req,res,next) =>{
    req.app.set("views", path.join(__dirname, "../views/user"));
    req.app.set(
      "layout",
      path.join(__dirname, "../views/layouts/userLayout.ejs")
    );
  next();
})

// middlewares

// check is user loged in   
router.use((req,res,next) =>{
    if(!req.session.email) return res.redirect('/login');
    return next();
})


// check is user verificated email
router.use(checkVerifyUser);




// routes

router.route('/verify-mail/:hash').get(checkVerifyHash,addVerifyUser,userController.verifyMail);
router.route('/send-verify-mail').get(checkLastMailTime,sendValidateMail,userController.sendVerifyMail);  
router.route('/logout').post(checkToken,userController.logoutPOST);
router.route('/').get(userController.index);




// 404 page error


router.use((req, res) => {
    res.status(404);
    if (req.accepts("html")) return res.render("404");
    if (req.accepts("json")) return res.json({ error: "Not found!" });
    return res.type("txt").send("Not found !");
});


module.exports = router;