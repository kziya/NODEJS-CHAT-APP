const crypto = require("crypto");

module.exports = (req, res, next) => {
  const hash = crypto
    .createHash("sha256")
    .update(req.session._token + process.env.MAIL_SECRET)
    .digest("hex");

  const fullUrl =
    req.protocol + "://" + req.get("host") + "/user/verify-mail/" + hash;
  req.mailMsg = {
    from: `${process.env.MAIL_NAME} <${process.env.MAIL_USER}>`,
    to: `<${req.session.email}>`,
    subject: "Verify Mail",
    html: `<a href="${fullUrl}">Click here to Verify mail</a>`,
  };
  req.session.verifyHash = hash;
  next();
};
