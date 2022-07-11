module.exports = (req, res, next) => {
  if (req.body._token === req.session._token) req.validateToken = true;
  next();
};
