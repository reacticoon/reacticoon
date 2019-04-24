import invariant from 'invariant'
import isNil from 'lodash/isNil'
import find from 'lodash/find'
import forEach from 'lodash/forEach'

import ReacticoonRoutingEnum from './ReacticoonRoutingEnum'

let _routes = []

export const addRoutes = routes => {
  // TODO: verify there is no conflicts on routes to add
  _routes = [ ..._routes, ...routes ]
}

export const registerRoutes = addRoutes

export const getRoutes = () => _routes

export const getConfigForRoute = route =>
  find(_routes, routeDefinition => route && route.name === routeDefinition.definition.name)

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

let _routingEnum = ReacticoonRoutingEnum

export const addRoutingEnum = routingEnum => {
  // TODO: verify there is no conflicts on routes to add
  _routingEnum = { ..._routingEnum, ...routingEnum }
}

export const registerRoutingEnum = addRoutingEnum

export const getRoutingEnum = () => _routingEnum

export const getRouteNameForRoute = routeToFind => {
  let res = null
  forEach(_routingEnum, (route, name) => {
    if (route.name === routeToFind.definition.name) {
      res = name
    }
  })
  return res
}

export const getRoute = routeName => {
  const route = getRoutingEnum()[routeName]
  invariant(
    !isNil(route),
    `Not route found for ${routeName}. Verify that you defined the route on the routes`
  )
  return route
}

//
//
//

export const registerRoutesConfig = (appOptions) => {
  // TODO: rename to routingEnum
  // Note: plugin routes config are handle on plugin
  // here we register the app routing
  registerRoutingEnum(appOptions.RoutingEnum)
  registerRoutes(appOptions.routes)
}