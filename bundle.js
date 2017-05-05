/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Router = __webpack_require__(1);
const Inbox = __webpack_require__(3);
const Sent = __webpack_require__(5);
const Compose = __webpack_require__(6);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Router {
  constructor(node, routes) {
    this.node = node;
    this.routes = routes;
  }

  start() {
    $(window).on("hashchange", (event) => {
      this.render();
    });
    this.render();
  }

  render() {
    this.node.innerHTML = "";
    let component = this.activeRoute();
    if (component !== undefined) {
      let newNode = component.render();
      this.node.appendChild(newNode);
    }
  }

  activeRoute() {
    let currentRoute = window.location.hash.slice(1);
    return this.routes[currentRoute];
  }
}


module.exports = Router;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(4);

const Inbox = {
  render: function() {
    let ul = document.createElement("ul");
    ul.className = "messages";
    let inboxMessages = MessageStore.getInboxMessages();
    inboxMessages.forEach( (message) => {
      let messageNode = this.renderMessage(message);
      ul.appendChild(messageNode);
    });
    return ul;
  },

  renderMessage: function (message) {
    let li = document.createElement("li");
    li.className = "message";
    li.innerHTML = `<span class="from">${message.from}</span>
    <span class="subject">${message.subject}</span>
    <span class="body">${message.body}</span>`;
    return li;
  }
};

module.exports = Inbox;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

let messages = {
  sent: [
    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
    {to: "person@mail.com", subject: "zzz", body: "so booring"}
  ],
  inbox: [
    {from: "grandma@mail.com",
      subject: "Fwd: Fwd: Fwd: Check this out",
      body: "Stay at home mom discovers cure for leg cramps. Doctors hate her"},
    {from: "person@mail.com",
      subject: "Questionnaire",
      body: "Take this free quiz win $1000 dollars"}
  ]};

const MessageStore = {
  getInboxMessages: function() {
    return messages.inbox;
  },

  getSentMessages: function() {
    return messages.sent;
  },

  getMessageDraft: function() {
    return messageDraft;
  },

  updateDraftField: function(field, value) {
    messageDraft[field] = value;
  },

  sendDraft: function() {
    messages.sent.push(messageDraft);
    messageDraft = new Message();
  }
};

class Message{
  constructor(from="", to="", subject="", body="") {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.body= body;
  }
}

let messageDraft = new Message();

module.exports = MessageStore;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(4);

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(4);

const Compose = {
  render: function() {
    let div = document.createElement("div");
    div.className = "new-message";
    div.innerHTML = this.renderForm();
    div.addEventListener("change", (event) => {
      let field = event.target;
      MessageStore.updateDraftField(field.name, field.value);
    });

    div.addEventListener("submit", (event) => {
      event.preventDefault();
      MessageStore.sendDraft();
      window.location.hash = "inbox";
    });
    return div;
  },

  renderForm: function () {
    let draft = MessageStore.getMessageDraft();
    let html = `
    <p class="new-message-header">New Message</p>

    <form class="compose-form">
      <input placeholder="Recipient"
              name="to"
              type="text"
              value=${draft.to}>
      <input placeholder="Subject"
              name="subject"
              type="text"
              value=${draft.subject}>
      <textarea name="body" rows=20>${draft.body}</textarea>
      <button type="submit"
              class="btn btn-primary submit-message">Send</button>
    </form>
    `;
    return html;
  }
};

module.exports = Compose;


/***/ })
/******/ ]);