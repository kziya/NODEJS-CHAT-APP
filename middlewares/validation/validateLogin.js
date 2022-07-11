const { check } = require("express-validator");
const User = require("../../models/Users");

module.exports = [
  check("email").isEmail().withMessage("Invalie email format!"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be longer than 7!"),
];
