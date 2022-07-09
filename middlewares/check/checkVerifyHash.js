module.exports = (req, res, next) => {

  if (req.session.verifyHash !== req.params.hash) req.verifyError = true;
  next();
};
