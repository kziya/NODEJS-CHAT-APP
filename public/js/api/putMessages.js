import createMessage  from "./createMessage.js";
export default (messages) => {
    const messagePlace = document.querySelector('#conversation');
   
  for(const message of messages)
  {
    createMessage(message,messagePlace);      
  }

};