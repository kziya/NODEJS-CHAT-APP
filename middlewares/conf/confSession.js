const sessions = require("express-session");
const store = require("../../models/sessionStore");
module.exports = sessions({
    path: "/",
    secret: process.env.SESSION_SECRET,
    httpOnly: process.env.SESSION_HTTP_ONLY,
    resave: process.env.SESSION_RESAVE,
    saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  });
