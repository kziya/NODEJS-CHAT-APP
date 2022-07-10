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
        // join to rooms
        const rooms = await getRooms(socket);
        socket.join(rooms);
        socket.on('message',async data =>{
            console.log(new Date().toUTCString());
            const message = {
                user : socket.request.session.email,
                sendAt : new Date().toUTCString(),
                value : data.value
            };

            try{
                const updated = await Rooms.updateOne({ id : data.roomId},{$push:{messages:message}});
                if(!updated.acknowledged)
                    throw new Error('Couldn\'t send to the db!');                
                socket.emit('message',message);
                socket.broadcast.to(data.roomId).emit('message',message);
            }catch(e)
            {
                console.log(e);
                message.error = 1;
                socket.emit('message',message);
            }
        });

    });


}