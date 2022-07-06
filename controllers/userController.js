
// GET
module.exports.index = (req,res) =>{
    res.locals._token = req.session._token;
    return res.render('index');
}

module.exports.verifyMail = (req,res) =>{
   if(req.verifyError)
   {
        return res.redirect('/send');
   }

    req.session.isVerified = true;
    delete req.session.verifyHash;
    return res.redirect('/user');
};

module.exports.sendVerifyMail = (req,res) => { 
    res.locals._token = req.session._token;
    if(req.mailError) 
        res.locals.errors = req.mailError;
    res.render('send-verify-mail');
};


// POST
module.exports.logoutPOST = (req,res) =>{
    if(!req.validateToken) return res.redirect('/user/404');
    req.session.destroy();
    return res.redirect('/');
}