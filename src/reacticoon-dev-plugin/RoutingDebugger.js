class RoutingDebugger {
  setCurrentRoute(route) {
    this.currenteRoute = route
  }

  getCurrentRoute = () => this.currenteRoute
}

export default new RoutingDebugger()
