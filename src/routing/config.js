import React from 'react'

import invariant from 'invariant'
import isNil from 'lodash/isNil'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'

// TODO: mv to reacticoon ?
import createAsyncPage from 'reacticoon-plugin-dev/views/createAsyncPage'

import ReacticoonRoutingEnum from './ReacticoonRoutingEnum'
import RouteDefinition from './RouteDefinition'
import createRoutingEnum from './createRoutingEnum'

let _routes = []

export const addRoutes = routes => {
  // TODO: verify there is no conflicts on routes to add
  _routes = [..._routes, ...routes]
}

export const registerRoutes = addRoutes

export const getRoutes = () => _routes

export const getConfigForRoute = route =>
  find(_routes, routeDefinition => {
    if (route && route.name) {
     return route.name === routeDefinition.definition.name
    }
    // handle route being a string
    return route === routeDefinition.definition.name
  })

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
    `No route found for ${routeName}. Verify that you defined the route on the routes`
  )
  return route
}

//
//
//

export const registerAppRouting = appOptions => {
  // Note: plugin routes config are handle on plugin
  // here we register the app routing
  // TODO: link to doc tutorial
  invariant(isEmpty(appOptions.routing), `routing configuration not found or empty`)

  registerRouting(appOptions.routing)
}

export const registerRouting = routing => {
  const { routingEnum, routesDefinitions } = generateRoutes(routing)
  registerRoutingEnum(routingEnum)
  registerRoutes(routesDefinitions)
}

export const generateRoutes = routing => {
  if (!isFunction(routing)) {
    // TODO: invariant
  }
  let routesDefinitions = []
  let routingEnum = {}

  if (!routing || !isFunction(routing)) {
    return {
      routingEnum,
      routesDefinitions,
    }
  }

  let createDevToolAsyncPage
  if (__DEV__) {
    const LoadingPageView = require('reacticoon-plugin-dev/components/LoadingPageView').default
    createDevToolAsyncPage = loader => createAsyncPage(loader, <LoadingPageView />)
  }

  let _loadingView = <div />
  const api = {
    //
    // Allow to define a default loadingView for all the createAsyncPage calls.
    //
    registerAsyncLoaderView: loadingView => {
      _loadingView = loadingView
    },
    //
    // We can specify a loadingView that differs from the default one (_loadingView).
    //
    createAsyncPage: (loader, loadingView) => createAsyncPage(loader, loadingView || _loadingView),
    //
    // Allow to use the dev pages loading view directly. It will use the
    // `reacticoon-plugin-dev/components/LoadingPageView` as loading view, avoiding repetitive code.
    //
    createDevToolAsyncPage,
  }

  const routesData = routing(api)

  routesDefinitions = []
  const routingEnumData = {}

  routesData.forEach(routeData => {
    const routeDefinition = new RouteDefinition(
      routeData.name,
      routeData.path,
      routeData.authRequired,
      routeData.disabled
    )

    const route = {
      definition: routeDefinition,
      handler: routeData.handler,
    }

    routesDefinitions.push(route)
    routingEnumData[routeData.name] = routeDefinition
  })

  routingEnum = createRoutingEnum(routingEnumData)

  if (FEATURE_REACTICOON_HEAVY_DEBUG) {
    // add additionnal private debug var
    forEach(routingEnum, definition => {
      definition.__plugin = name
    })
  }

  return {
    routingEnum,
    routesDefinitions,
  }
}
