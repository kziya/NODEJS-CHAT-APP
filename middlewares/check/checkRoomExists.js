const Rooms = require("../../models/Rooms");
module.exports = async(roomId) =>  Rooms.findOne({ id:roomId });

