import React from 'react'

import { Route, Switch } from 'react-router'
import map from 'lodash/map'
import isNil from 'lodash/isNil'
import invariant from 'invariant'

import { getQueryFromUri } from 'reacticoon/routing/utils'

import Layout from '../components/Layout'
import RouteContent from '../components/RouteContent'

//
// Take the appOptions provide by the projet and create the routes
//

// Allows to handle refacto from react-router v3 to v4, where routeParams does not long exists.
const createRouteContent = route => ({ location, ...props }) => {
  const locationFinal = { ...location, query: getQueryFromUri(location.search) }
  const routeProps = {
    ...props,
    location: locationFinal,
    route: route.definition,
    routeParams: props.match.params,
    params: props.match.params,
  }
  return (
    <RouteContent {...routeProps}>{React.createElement(route.handler, routeProps)}</RouteContent>
  )
}

const generateRoute = route => {
  invariant(!isNil(route.definition), `definition does not exists for ${route.handler}`)
  invariant(!isNil(route.handler), `handler does not exists for ${route.definition.name}`)

  // __REACTICOON_NOOP_PAGE is used for pages that will not be handled. For example pages that
  // only exists on dev env.
  if (!route.definition.disabled && !route.handler.__REACTICOON_NOOP_PAGE) {
    return (
      <Route
        exact
        name={route.definition.name}
        path={route.definition.path}
        component={createRouteContent(route)}
        key={route.definition.name}
      />
    )
  }

  return null
}

const configureRoutes = ({ routes }) => {
  // do not keep disabled routes
  const routesToGenerate = routes.filter(route => !route.disabled)

  return (
    <Layout>
      <Switch>{map(routesToGenerate, route => generateRoute(route))}</Switch>
    </Layout>
  )
}

export default configureRoutes
