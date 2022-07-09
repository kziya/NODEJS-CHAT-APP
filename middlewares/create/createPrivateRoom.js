const Rooms = require("../../models/Rooms")
const Users = require("../../models/Users")
const { v4 : uuidv4 } = require('uuid');

module.exports = async(...emails) =>{
    const room = new Rooms();
    room.id = uuidv4();
    for(const email of emails)
    {
        room.users.push({ email });
    }
    const isCreatedRoom = await room.save();
    if(!isCreatedRoom) return false;
    const update = await Users.updateMany({ email : { $in : [...emails] } },{ $push : { rooms: { id: room.id }   } });
    if(!update) return false;
    return room;
}