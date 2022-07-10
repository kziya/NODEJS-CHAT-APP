export default (message,messagePlace) => {
    const messageInner = `   
    <div class="col-sm-12 " id="main-message-container">
      <div class="" id="main-message-content">

      </div>
    </div>
  `;

    // get sender 
  const messageUser = message.user === email ? 'sender' : 'receiver';

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('row','message-body');
  mainContainer.innerHTML = messageInner;
  const contentPlace = mainContainer.querySelector('#main-message-content');
  // add classes
  mainContainer.querySelector('#main-message-container').classList.add('message-main-' + messageUser);

  contentPlace.classList.add(messageUser);

  
  // create Text place
  const messageText = document.createElement('div');
  messageText.classList.add('message-text');
  messageText.innerText = message.value;
  contentPlace.appendChild(messageText);

  // create time place
  const messageTime = document.createElement('span');
  messageTime.classList.add('message-time','pull-right');
  messageTime.innerText = new Date(message.sendAt).toLocaleString();
  contentPlace.appendChild(messageTime);
    
  // push message to container
  messagePlace.appendChild(mainContainer);
}