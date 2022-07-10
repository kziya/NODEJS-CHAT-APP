module.exports = (messages,logedAt) => {
    const filteredMessages = [];

    for(const message of messages)
    {
        if(message.sendAt <  logedAt) continue;
        filteredMessages.push(message);
    }
    
    return filteredMessages;
};