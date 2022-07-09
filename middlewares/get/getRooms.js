const Users = require('../../models/Users');
module.exports = async(socket) =>{
    const user = await Users.findOne({ email : socket.request.session.email  },{ rooms : 1})
    return user.rooms;
};