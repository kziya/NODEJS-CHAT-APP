// models
const Rooms = require("./models/Rooms");
const Users = require("./models/Users");
// middlewares
const expressSession = require("./middlewares/conf/confSession");
const getRooms = require("./middlewares/get/getRooms");

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

module.exports = (server) => {
  const io = require("socket.io")(server,{
    origin : 'example',
    methods:['GET','POST']
  });
  io.use(wrap(expressSession));
  io.on("connection", async (socket) => {
    // check is Auth
    if (!socket.request.session.isAuth) {
      return;
    }

    // join to rooms
    const rooms = await getRooms(socket);
    socket.join(rooms);

    // on message
    socket.on("message", async (data) => {
      // check validations
      if (data._token !== socket.request.session._token) return;
      if (data.value.trim() === "") return;

      // create messages
      const message = {
        user: socket.request.session.email,
        sendAt: new Date().toUTCString(),
        value: data.value,
      };

      try {
        // add message to the db
        const updated = await Rooms.updateOne(
          { id: data.roomId },
          { $push: { messages: message } }
        );
        if (!updated.acknowledged) throw new Error("Couldn't send to the db!");
        message.roomId = data.roomId;
        socket.emit("message", message);
        socket.to(data.roomId).emit("message", message);
      } catch (e) {
        message.error = 1;
        socket.emit("message", message);
      }
    });

    socket.on("online", (user) => {
      socket.broadcast.emit("online", user);
    });
  });
};
