const Rooms = require("../../models/Rooms");
module.exports = (req, res) => {
  const isExists = Rooms.findOne({});
};
