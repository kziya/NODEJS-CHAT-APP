module.exports = (req, isVerified) => {
  req.session.email = req.body.email;
  req.session.isVerified = isVerified;
  req.session.isAuth = true;
};
