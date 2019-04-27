import React from 'react'

import { Route, createRoutingEnum } from 'reacticoon/routing'
import { createLoadable } from 'reacticoon/view'

const ROUTE_PREFIX = '/_rc/api-mock'

// import DevPluginApiMockSection from './views/DevPluginApiMockSection'

const routingEnum = createRoutingEnum({
  API_MOCK_DASHBOARD: new Route('API_MOCK::DASHBOARD', `${ROUTE_PREFIX}`),
})

const createAsyncPage = loader => createLoadable(loader, () => <div />)

const routes = [
  {
    definition: routingEnum.API_MOCK_DASHBOARD,
    handler: createAsyncPage(() =>
      import(/*  webpackChunkName: "ApiMock__DashboardPage" */ '../pages/DevPluginApiMockDashboard')
    ),
  },
]

export default {
  routes,
  routingEnum,
}
