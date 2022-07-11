const User = require('../../models/Users');

module.exports = async (currentEmail) => await User.find({ $email : { $ne : currentEmail}}).limit(20);