const Rooms = require('../../models/Rooms');
module.exports = async(email1,email2) =>{
    const room = await Rooms.findOne({  $and :[{isGroup : false,'users.email' : email1},{isGroup : false,'users.email' : email2 } ]});
    
    return room ? room  : false;
}