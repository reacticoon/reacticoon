import React from 'react'

import { Route, createRoutingEnum } from 'reacticoon/routing'
import { createLoadable } from 'reacticoon/view'

const ROUTE_PREFIX = '/_rc'

const routingEnum = createRoutingEnum({
  REACTICOON_DASHBOARD: new Route('REACTICOON::DASHBOARD', `${ROUTE_PREFIX}`),
  REACTICOON_PLUGINS: new Route('REACTICOON::PLUGINS', `${ROUTE_PREFIX}/plugins`),
  REACTICOON_PLUGIN: new Route('REACTICOON::PLUGIN', `${ROUTE_PREFIX}/plugins/:pluginName`),
  REACTICOON_ROUTING: new Route('REACTICOON::ROUTING', `${ROUTE_PREFIX}/routing`)
})

const createAsyncPage = loader => createLoadable(loader, () => <div />)

const routes = [
  {
    definition: routingEnum.REACTICOON_DASHBOARD,
    handler: createAsyncPage(() => import(/*  webpackChunkName: "Reacticoon__DashboardPage" */ '../pages/dashboard')),
  },
  {
    definition: routingEnum.REACTICOON_PLUGIN,
    handler: createAsyncPage(() => import(/*  webpackChunkName: "Reacticoon__PluginPage" */ '../pages/plugin')),
  },
  {
    definition: routingEnum.REACTICOON_PLUGINS,
    handler: createAsyncPage(() => import(/*  webpackChunkName: "Reacticoon__PluginsPage" */ '../pages/plugins')),
  },
  {
    definition: routingEnum.REACTICOON_ROUTING,
    handler: createAsyncPage(() => import(/*  webpackChunkName: "Reacticoon__RoutingPage" */ '../pages/routing')),
  },
]

export default {
  routes,
  routingEnum,
}