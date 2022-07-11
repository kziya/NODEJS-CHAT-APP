const router = require("express").Router();
const apiController = require("../controllers/apiController");

const checkToken = require("../middlewares/check/checkToken");

// middlewares

// check is user loged in
router.use((req, res, next) => {
  if (!req.session.isAuth) return res.redirect("/login");
  return next();
});

// routes

router.post("/get-messages", checkToken, apiController);

module.exports = router;
