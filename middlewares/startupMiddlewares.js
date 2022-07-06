const expressLayouts = require("express-ejs-layouts");
const confSession = require("./conf/confSession");
const addHeaders = require("./add/addHeaders");

module.exports = [expressLayouts, confSession, addHeaders];
