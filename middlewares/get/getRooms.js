const Users = require('../../models/Users');
module.exports = async(socket) =>{
    const user = await Users.findOne({ email : socket.request.session.email  },{ rooms : 1})
    const rooms = [];
    for(const room of user.rooms)
    {
        rooms.push(room.id);
    }
    
    return rooms;
};