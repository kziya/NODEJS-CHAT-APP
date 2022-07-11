const { check } = require("express-validator");

module.exports = [
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password length must be longer than 7"),
  check("confirm_password").custom((val, { req }) => {
    if (val !== req.body.password)
      throw new Error("Password confirmation does not match password");
    return true;
  }),
];
