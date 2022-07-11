const mailer = require("../conf/confMailer");

module.exports = async (req, res, next) => {
  if (req.errors) return next();

  try {
    const sendFlag = await mailer.sendMail(req.mailMsg);
    if (!sendFlag) {
      req.errors =
        "We have some trouble with sending mails,please try again later!";
      delete req.session.verifyHash;
    } else {
      req.session.verifyHash = res.locals.hash;
      req.session.lastMailTime = Date.now();
    }
  } catch (e) {
    req.errors =
      "We have some trouble with sending mails,please try again later!";
  }

  next();
};
