import React from 'react'

import { Route } from 'react-router'
import map from 'lodash/map'
import isNil from 'lodash/isNil'
import invariant from 'invariant'

import Layout from '../components/Layout'

import { registerRoutes } from '../../routing/config'

//
// Take the appOptions provide by the projet and create the routes
//

const generateRoute = route => {
  invariant(!isNil(route.definition), `definition does not exists for ${route.handler}`)
  invariant(!isNil(route.handler), `handler does not exists for ${route.definition.name}`)

  if (!route.definition.disable) {
    return (
      <Route
        name={route.definition.name}
        path={route.definition.path}
        component={route.handler}
        key={route.definition.name}
      />
    )
  }

  return null
}

const routeCreator = appOptions => {
  registerRoutes(appOptions.routes)

  // do not keep disabled routes
  const routesToGenerate = appOptions.routes.filter(route => !route.disabled)

  const routes = store => (
    <Route path="" component={Layout}>
      {map(routesToGenerate, route => generateRoute(route))}
    </Route>
  )

  return routes
}

export default routeCreator
