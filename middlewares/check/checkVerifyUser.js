module.exports = (req,res,next) =>{
    if(!req.session.isVerified && !['/send-verify-mail','/verify-mail','/logout'].find(elem => req.path.startsWith(elem)))
        return res.redirect('/user/send-verify-mail');
    else if(req.session.isVerified && ['/send-verify-mail','/verify-mail'].find(elem => req.path.startsWith(elem)))
        return res.redirect('/user/404');
    next();
}