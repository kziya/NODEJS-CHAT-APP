const router = require('express').Router();
const homeController = require('../controllers/homeController');


router.route('/').get((req,res) =>{
    res.end('404');
})



module.exports = router;