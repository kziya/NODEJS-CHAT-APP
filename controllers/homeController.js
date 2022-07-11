const User = require("../models/Users");
const hashPassword = require("../middlewares/hash/hashPassword");
const addSessions = require("../middlewares/add/addSessions");

// GET

module.exports.index = (req, res) => {
  return res.render("index");
};

module.exports.login = (req, res) => {
  res.locals._token = req.session._token;
  return res.render("home/login");
};

module.exports.signUp = (req, res) => {
  res.locals._token = req.session._token;
  return res.render("home/sign-up");
};

module.exports.forgetPassword = (req, res) => {
  res.locals._token = req.session._token;
  return res.render("home/forget-password");
};

module.exports.changePassword = (req, res) => {
  console.log(req.verifyError);
  if (req.verifyError) return res.render("home/404");

  res.locals._token = req.session._token;
  res.locals.hash = req.params.hash;
  res.render("home/change-password");
};

//POST

module.exports.loginPOST = async (req, res) => {
  res.locals.email = req.body.email;
  res.locals._token = req.session._token;

  // check errors
  if (!req.validateToken) {
    res.locals.errors = [{ msg: "Something went wrong !" }];
    return res.status(400).render("home/login");
  }

  if (req.errors) {
    res.locals.errors = req.errors;
    return res.status(400).render("home/login");
  }

  // get user
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: hashPassword(req.body.password),
    });

    if (!user) {
      res.locals.errors = [{ msg: "Username or password is wrong !" }];
      return res.status(400).render("home/login");
    }

    addSessions(req, user.isVerified);
    if (req.body.remember) req.session.cookie.maxAge *= 365; // 1 year
    return res.redirect("/user");
  } catch (e) {
    res.locals.errors = [
      { msg: "Something went wrong, please try again later!" },
    ];
    return res.status(500).render("home/login");
  }
};

module.exports.signUpPOST = async (req, res) => {
  res.locals.email = req.body.email;
  res.locals._token = req.session._token;
  // check errors

  if (!req.validateToken) {
    res.locals.errors = [{ msg: "Something went wrong !" }];
    return res.status(400).render("home/sign-up");
  }

  if (req.errors) {
    res.locals.errors = req.errors;
    return res.status(400).render("home/sign-up");
  }

  // add User
  try {
    const user = await User.create({
      email: req.body.email,
      password: hashPassword(req.body.password),
    });

    if (!user) {
      res.locals.errors = [
        { msg: "Something went wrong, please try again later !" },
      ];
      return res.status(500).render("home/sign-up");
    }

    addSessions(req, false);
    return res.redirect("/user");
  } catch (e) {
    res.locals.errors = [
      { msg: "Something went wrong, please try again later !" },
    ];
    return res.status(500).render("home/sign-up");
  }
};

module.exports.forgetPasswordPOST = (req, res) => {
  if (!req.validateToken) return res.redirect("/user/404");
  if (req.errors) {
    res.locals._token = req.session._token;
    res.locals.errors = req.errors;
    return res.status(400).render("home/forget-password");
  }
  req.session.email = req.body.email;
  return res.redirect("/login");
};

module.exports.changePasswordPOST = async (req, res) => {
  res.locals.hash = req.session.verifyHash;

  if (req.errors) {
    res.locals.errors = req.errors;
    return res.render("home/change-password");
  }

  try {
    const update = await User.updateOne(
      { email: req.session.email },
      { $set: { password: hashPassword(req.body.password) } }
    );

    if (!update) {
      res.locals.errors = [{ msg: "Something went wrong !" }];
      return res.render("home/change-password");
    } else return res.redirect("/login");
  } catch (e) {
    res.locals.errors = [{ msg: "Something went wrong !" }];
    return res.render("home/change-password");
  }
};
