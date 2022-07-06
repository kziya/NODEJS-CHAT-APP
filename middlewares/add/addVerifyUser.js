const User = require('../../models/Users');
module.exports = async(req,res,next) =>{

    if(req.verifyError) return next();
    try{
        const update = await User.findOneAndUpdate({email:req.session.email},{$set:{ isVerified : true }});
        if(!update)
            req.verifyError = true;
    }catch(e)
    {
        req.verifyError = true;
    }

    next();
}