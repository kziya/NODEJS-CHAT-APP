const { check } = require("express-validator");
const Users = require("../../models/Users");
module.exports = check("email")
  .isEmail()
  .withMessage("Invalid email format!")
  .custom(async (val) => {
    const user = await Users.findOne({ email: val });
    if (!user) throw new Error("User is not registered yet!");

    return true;
  });
