const Rooms = require('../../models/Rooms');

module.exports = async (email) => await Rooms.find(
    { "users.email": { $eq: email } },
    { id: 1, users: 1, isGroup: 1, name: 1 }
  );