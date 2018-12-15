import React from 'react'

import { Route, createRoutingEnum } from 'reacticoon/routing'
import { createLoadable } from 'reacticoon/view'

const ROUTE_PREFIX = '/_rc'

const routingEnum = createRoutingEnum({
  REACTICOON_PLUGINS: new Route('REACTICOON::PLUGINS', `${ROUTE_PREFIX}/plugins`),
  REACTICOON_PLUGIN: new Route('REACTICOON::PLUGIN', `${ROUTE_PREFIX}/plugins/:pluginName`),
})

const createAsyncPage = loader => createLoadable(loader, () => <div />)

const routes = [
  {
    definition: routingEnum.REACTICOON_PLUGIN,
    handler: createAsyncPage(() => import(/*  webpackChunkName: "Reacticoon__PluginPage" */ '../pages/plugin')),
  },
  {
    definition: routingEnum.REACTICOON_PLUGINS,
    handler: createAsyncPage(() => import(/*  webpackChunkName: "Reacticoon__PluginsPage" */ '../pages/plugins')),
  },
]

export default {
  routes,
  routingEnum,
}