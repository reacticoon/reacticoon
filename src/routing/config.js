import invariant from 'invariant'
import isNil from 'lodash/isNil'
import find from 'lodash/find'

let _routes = []

export const registerRoutes = routes => {
  _routes = routes
}

export const getRoutes = routes => _routes

export const getConfigForRoute = route =>
  find(_routes, routeDefinition => route.name === routeDefinition.definition.name)

//
//
//

let _history = null

export const registerHistory = history => {
  _history = history
}

export const getHistory = () => _history

//
//
//

let _RoutingEnum = null

export const registerRoutingEnum = RoutingEnum => {
  _RoutingEnum = RoutingEnum
}

export const getRoutingEnum = () => _RoutingEnum

export const getRoute = routeName => {
  const route = getRoutingEnum()[routeName]
  invariant(
    !isNil(route),
    `Not route found for ${routeName}. Verify that you defined the route on the routes`
  )
  return route
}
