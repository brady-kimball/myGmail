const Router = require('./router.js');
const Inbox = require('./Inbox.js');
const Sent = require('./sent.js');
const Compose = require('./compose.js');

window.addEventListener('DOMContentLoaded', () => {
  console.log('works');
  $(".sidebar-nav").on("click", "li", (event) => {
    let ref = event.currentTarget.innerText.toLowerCase();
    window.location.hash = ref;
  });

  let contentNode = document.querySelector(".content");
  const router = new Router(contentNode, routes);
  router.start();
  window.location.hash = "inbox";
});

const routes = {
  inbox: Inbox,
  sent: Sent,
  compose: Compose
};
