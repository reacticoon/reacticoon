/**
 * Singleton that keep track of the current route displayed.
 */
class RoutingDebugger {
  _routesHistory = []

  setCurrentRoute(route) {
    this.currenteRoute = route
    this._routesHistory.push(route)
  }

  getCurrentRoute = () => this.currenteRoute

  getRoutesHistory = () => this._routesHistory
}

export default new RoutingDebugger()
