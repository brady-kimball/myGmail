class Router {
  constructor(node) {
    this.node = node;
    this.start.bind(this)();
  }

  start() {
    $(window).on("hashchange", (event) => {
      this.render();
    });
    this.render();
  }

  render() {
    this.node.innerHTML = "";
    let routeName = this.activeRoute();
    let newNode = document.createElement("p");
    newNode.innerHTML = routeName;
    this.node.appendChild(newNode);
  }

  activeRoute() {
    return window.location.hash.slice(1);
  }
}


module.exports = Router;
