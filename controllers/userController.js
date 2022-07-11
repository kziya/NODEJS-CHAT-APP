const Users = require("../models/Users");
const Rooms = require("../models/Rooms");

const checkUserExists = require("../middlewares/check/checkUserExists");
const checkPrivateRoomWithUser = require("../middlewares/check/checkPrivateRoomWithUser");

const createPrivateRoom = require("../middlewares/create/createPrivateRoom");
// GET
module.exports.index = async (req, res) => {
  res.locals._token = req.session._token;
  res.locals.email = req.session.email;

  // get users and rooms
  try {
    res.locals.users = await Users.find({
      email: { $ne: req.session.email },
    }).limit(5);
    res.locals.rooms = await Rooms.find(
      { "users.email": { $eq: req.session.email } },
      { id: 1, users: 1 }
    );
  } catch (e) {
    return res.redirect("/user/404");
  }

  return res.render("index");
};

module.exports.verifyMail = (req, res) => {
  if (req.verifyError) {
    return res.redirect("/");
  }

  req.session.isVerified = true;
  delete req.session.verifyHash;
  return res.redirect("/user");
};

module.exports.sendVerifyMail = (req, res) => {
  res.locals._token = req.session._token;
  if (req.errors) res.locals.errors = req.errors;
  res.render("send-verify-mail");
};

module.exports.createRoom = async (req, res) => {
  try {
    const isUserExists = await checkUserExists(req.params.userEmail);
    if (!isUserExists || req.params.userEmail === req.session.email)
      return res.redirect("/user/404");
    const room = await checkPrivateRoomWithUser(
      req.params.userEmail,
      req.session.email
    );
    if (room) return res.redirect("/user/chat/" + room.id);
    const createdRoom = await createPrivateRoom(
      req.session.email,
      req.params.userEmail
    );
    if (!createdRoom) return res.render("404");
    return res.redirect("/user/chat/" + createdRoom.id);
  } catch (e) {
    return res.redirect("/user/404");
  }
};

module.exports.chatRoom = async (req, res) => {
  res.locals._token = req.session._token;
  res.locals.email = req.session.email;

  // get users and rooms
  try {
    res.locals.currentRoom = await Rooms.findOne({ id: req.params.roomId });
    if (!res.locals.currentRoom) return res.redirect("/user/404"); // if not exists chat
    res.locals.users = await Users.find({
      email: { $ne: req.session.email },
    }).limit(5);
    res.locals.rooms = await Rooms.find(
      { "users.email": { $eq: req.session.email } },
      { id: 1, users: 1 }
    );
  } catch (e) {
    return res.redirect("/user/404");
  }

  return res.render("chat");
};

// POST
module.exports.logoutPOST = (req, res) => {
  if (!req.validateToken) return res.redirect("/user/404");
  req.session.destroy();
  return res.redirect("/");
};
