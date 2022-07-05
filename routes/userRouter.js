const router = require('express').Router();
const userController = require('../controllers/userController');



// configurations


// middlewares



// routes

router.route('/').get(userController.index);




module.exports = router;