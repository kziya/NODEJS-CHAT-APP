const mailer = require('../conf/confMailer');
const crypto = require('crypto');

module.exports = async(req,res,next) =>{
    if(req.mailError) return next();

    try{
        const hash = crypto.createHash('sha256').update(req.session._token + process.env.MAIL_SECRET).digest('hex');
        const url =  req.protocol + "://" + req.get("host") + "/user/verify-mail/" + hash;
        const msg = {
            from: `${process.env.MAIL_NAME} <${process.env.MAIL_USER}>`,
            to: `<${req.session.email}>`,
            subject: "Verify Mail",
            html: `<a href="${url}">Click here to Verify mail</a>`,
        }
        const sendFlag = await mailer.sendMail(msg) 
        if(!sendFlag)
            req.mailError = "We have some trouble with sending mails,please try again later!";
        else {
            req.session.lastMailTime = Date.now();
            req.session.verifyHash = hash;
        }
    }catch(e)
    {
        req.mailError = "We have some trouble with sending mails,please try again later!";
    }


    next();
}