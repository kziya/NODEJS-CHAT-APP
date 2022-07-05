const router = require('express').Router();
const userController = require('../controllers/userController');



// configurations


// middlewares

// check is user loged in   
router.use((req,res,next) =>{
    if(!req.session.email) return res.redirect('/login');
    return next();
})


// routes

router.route('/').get(userController.index);

module.exports = router;