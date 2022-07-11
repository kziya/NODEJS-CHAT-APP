import formatTime from "./formatTime.js";

const createTimePlace = (contentPlace, message) => {
  const messageTime = document.createElement("span");
  messageTime.classList.add("message-time", "pull-right");
  messageTime.innerText = formatTime(new Date(message.sendAt));
  contentPlace.appendChild(messageTime);
};
const makeErrorPlace = (contentPlace) => {
  const errorMessage = document.createElement("div");
  errorMessage.classList.add("error-message");
  errorMessage.innerText = "Couldn't send message!";
  contentPlace.prepend(errorMessage);
};

const createDivPlace = (contentPlace, message, category) => {
  const messageName = document.createElement("div");
  messageName.classList.add(`message-${category}`);
  messageName.innerText = message[category === "name" ? "user" : "value"];
  contentPlace.appendChild(messageName);
};

export default (message, messagePlace) => {
  const messageInner = `   
    <div class="col-sm-12 " id="main-message-container">
      <div class="" id="main-message-content">

      </div>
    </div>
  `;

  // get sender
  const messageUser = message.user === email ? "sender" : "receiver";
  const mainContainer = document.createElement("div");
  mainContainer.classList.add("row", "message-body");
  mainContainer.innerHTML = messageInner;
  const contentPlace = mainContainer.querySelector("#main-message-content");
  // add classes
  mainContainer
    .querySelector("#main-message-container")
    .classList.add("message-main-" + messageUser);

  contentPlace.classList.add(messageUser);

  createDivPlace(contentPlace, message, "name");
  // create Text place
  createDivPlace(contentPlace, message, "text");
  // create time place
  createTimePlace(contentPlace, message);

  if (message.error) {
    makeErrorPlace(contentPlace);
  }

  // push message to container
  messagePlace.appendChild(mainContainer);
  messagePlace.scrollTop = messagePlace.scrollHeight;
};
