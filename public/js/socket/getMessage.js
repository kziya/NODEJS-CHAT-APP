import createMessage from '../dom/createMessage.js';
socket.on('message',data => {
    const messagePlace = document.querySelector('#conversation');
    createMessage(data,messagePlace);
});