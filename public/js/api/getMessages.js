import   putMessages from './putMessages.js';

$.post('http://localhost:8000/user/api/get-messages',{ _token,roomId },(messages) =>{
    putMessages(messages);
},'json');