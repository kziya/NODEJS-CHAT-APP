// models
const Rooms = require('./models/Rooms');
const Users = require('./models/Users');
// middlewares
const expressSession = require('./middlewares/conf/confSession');
const getRooms = require('./middlewares/get/getRooms');


const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);


module.exports = (server) =>{
    const io = require('socket.io')(server);
    io.use(wrap(expressSession));
    io.on('connection', async(socket) =>{
        console.log('Connected!');
        // join to rooms
        const rooms = await getRooms(socket);
        console.log(rooms.length);        
        //console.dir(rooms);
        socket.join(rooms);

    });





}