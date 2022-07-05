const User = require('../models/Users');
const hashPassword = require('../middlewares/hash/hashPassword');
const addSessions = require('../middlewares/add/addSessions');

// GET
module.exports.index = (req,res) =>{
    return res.render('index');
};


module.exports.login = (req,res) =>{
    res.locals._token = req.session._token;
    return res.render('login');
}

module.exports.signUp = (req,res) =>{
    res.locals._token = req.session._token;
    return res.render('sign-up');
}

//POST

module.exports.signUpPOST = (req,res) => {
    res.locals.email = req.body.email;
    res.locals._token = req.session._token;
    // check errors
    if(!req.validateToken)
    {
        console.dir({
            session : req.session._token,
            body : req.body._token
        })
        res.locals.errors = [{ msg : "Something went wrong !" }];
        return res.status(400).render('sign-up');
    }    

    if(req.validationErrors){
        res.locals.errors = req.validationErrors;
        return res.status(400).render('sign-up');
    }

    // add User
    try{
        const user = User.create({
            email : req.body.email,
            password : hashPassword(req.body.password),
        });
        
        if(!user)
        {
            res.locals.errors = [{ msg : "Something went wrong, please try again later !"}];
            return res.status(500).render('sign-up');
        }

        addSessions(req,false);
        return res.redirect('/user');
    }catch(e)
    {
        res.locals.errors = [{ msg : "Something went wrong, please try again later !"}];
        return res.status(500).render('sign-up');
    }
}