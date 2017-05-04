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
