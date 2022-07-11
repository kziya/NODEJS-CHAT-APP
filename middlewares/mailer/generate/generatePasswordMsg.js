const crypto = require("crypto");

module.exports = (req, res, next) => {
  const hash = crypto
    .createHash("sha256")
    .update(req.session._token + process.env.MAIL_SECRET)
    .digest("hex");

  const fullUrl =
    req.protocol + "://" + req.get("host") + "/change-password/" + hash;
  req.mailMsg = {
    from: `${process.env.MAIL_NAME} <${process.env.MAIL_USER}>`,
    to: `<${req.body.email}>`,
    subject: "Change password",
    html: `<a href="${fullUrl}">Click here to Change password</a>`,
  };
  res.locals.hash = hash;
  next();
};
