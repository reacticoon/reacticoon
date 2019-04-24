import React from 'react'

import { Route } from 'react-router'
import map from 'lodash/map'
import isNil from 'lodash/isNil'
import invariant from 'invariant'

import Layout from '../components/Layout'

//
// Take the appOptions provide by the projet and create the routes
//

const generateRoute = route => {
  invariant(!isNil(route.definition), `definition does not exists for ${route.handler}`)
  invariant(!isNil(route.handler), `handler does not exists for ${route.definition.name}`)

  if (!route.definition.disabled) {
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

const configureRoutes = ({ routes }) => {

  // do not keep disabled routes
  const routesToGenerate = routes.filter(route => !route.disabled)

  return (
    <Route path="" component={Layout}>
      {map(routesToGenerate, route => generateRoute(route))}
    </Route>
  )
}

export default configureRoutes
