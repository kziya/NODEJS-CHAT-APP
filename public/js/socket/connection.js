const socket = io('http://localhost:8000');

socket.on('connect',() =>{
    console.log(socket.disconnected);
})