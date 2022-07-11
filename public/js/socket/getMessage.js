import createMessage from "../dom/createMessage.js";
import makeNotification from "../dom/makeNotification.js";

socket.on("message", (data) => {
  const messagePlace = document.querySelector("#conversation");
  if (data.roomId === roomId) return createMessage(data, messagePlace);
  return makeNotification(data);
});
