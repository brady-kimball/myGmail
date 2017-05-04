const Router = require('./router.js');

window.addEventListener('DOMContentLoaded', () => {
  console.log('works');
  $(".sidebar-nav").on("click", "li", (event) => {
    let ref = event.currentTarget.innerText.toLowerCase();
    window.location.hash = ref;
  });

  let contentNode = document.querySelector(".content");
  const router = new Router(contentNode);
});
