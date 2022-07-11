module.exports = (req, res, next) => {
  if (req.method === "POST") return next();
  let _token = "";
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 50; i++) {
    const randNum = Math.floor(Math.random() * chars.length);
    _token += chars[randNum];
  }
  req.session._token = _token;
  next();
};
