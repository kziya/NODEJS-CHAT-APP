const Users = require("../models/Users");
const Rooms = require("../models/Rooms");

const filterMessages = require("../middlewares/filter/filterMessages");

// get

// post
module.exports = async (req, res) => {
  try {
    if (!req.validateToken)
      return res.status(400).json({ value: "Bad request!" });
    const roomData = await Rooms.findOne(
      { id: req.body.roomId, "users.email": req.session.email },
      { messages: { $slice: -100 }, users: 1 }
    );
    if (!roomData) return res.status(400).json({ value: "Cannot find room!" });

    const logedAt = roomData.users.find(
      (user) => user.email === req.session.email
    ).logedAt;
    const messages = filterMessages(roomData.messages, logedAt);

    return res.status(200).json(messages);
  } catch (e) {
    return res
      .status(500)
      .json({ value: "Something went wrong, try again later please." });
  }
};
