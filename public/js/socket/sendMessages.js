"use strict";
const form = document.querySelector('form');
const textArea = document.querySelector('#comment');


const sendMessage = () => {
    const data = {
        roomId,
        user:email,
        value : textArea.value
    }

    socket.emit('message',data);
}



form.addEventListener('submit',(e) => {
    e.preventDefault();
    sendMessage();
    textArea.value = '';
});



textArea.addEventListener('keydown',(e) =>{
    
    if(e.key === 'Enter') {
        e.preventDefault();
        sendMessage();  
        e.target.value = '';

    }
});