const MessageStore = require('./message_store.js');

const Sent = {
  render: function() {
    let ul = document.createElement("ul");
    ul.className = "messages";
    let sentMessages = MessageStore.getSentMessages();
    sentMessages.forEach( (message) => {
      let messageNode = this.renderMessage(message);
      ul.appendChild(messageNode);
    });
    return ul;
  },

  renderMessage: function (message) {
    let li = document.createElement("li");
    li.className = "message";
    li.innerHTML = `<span class="to">${message.to}</span>
    <span class="subject">${message.subject}</span>
    <span class="body">${message.body}</span>`;
    return li;
  }
};

module.exports = Sent;
