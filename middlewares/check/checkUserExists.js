const Users = require('../../models/Users');
module.exports = async(email) => {
    const user = await Users.findOne({email});
    return user ? user : false;
}