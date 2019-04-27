import { Route, createRoutingEnum } from 'reacticoon/routing'
import createAsyncPage from 'reacticoon/reacticoon-dev-plugin/views/createAsyncPage'

const ROUTE_PREFIX = '/_rc'

const routingEnum = createRoutingEnum({
  REACTICOON_DASHBOARD: new Route('REACTICOON::DASHBOARD', `${ROUTE_PREFIX}`),
  REACTICOON_PLUGINS: new Route('REACTICOON::PLUGINS', `${ROUTE_PREFIX}/plugins`),
  REACTICOON_PLUGIN: new Route('REACTICOON::PLUGIN', `${ROUTE_PREFIX}/plugins/:pluginName`),
  REACTICOON_ROUTING: new Route('REACTICOON::ROUTING', `${ROUTE_PREFIX}/routing`),
  REACTICOON_REPORTS: new Route('REACTICOON::REPORTS', `${ROUTE_PREFIX}/reports`),
  REACTICOON_MY_APP: new Route('REACTICOON::MY_APP', `${ROUTE_PREFIX}/app`),
  REACTICOON_MODULE: new Route('REACTICOON::MODULE', `${ROUTE_PREFIX}/modules/:moduleName`),
  REACTICOON_REPORT_CHECKUP: new Route('REACTICOON::CHECKUP', `${ROUTE_PREFIX}/reports/checkup`),
  REACTICOON_REPORT_CLI_PLUGINS: new Route(
    'REACTICOON::CLI_PLUGINS',
    `${ROUTE_PREFIX}/reports/cli-plugins`
  ),
  REACTICOON_REPORT_ANALYZE_BUILD: new Route(
    'REACTICOON::ANALYZE_BUILD',
    `${ROUTE_PREFIX}/reports/analyze-build`
  ),
  REACTICOON_REPORT_ANALYZE_BUNDLE_PHOBIA: new Route(
    'REACTICOON::REACTICOON_REPORT_ANALYZE_BUNDLE_PHOBIA',
    `${ROUTE_PREFIX}/reports/analyze-bundle-phobia`
  ),
})

const routes = [
  {
    definition: routingEnum.REACTICOON_DASHBOARD,
    handler: createAsyncPage(() =>
      import(/*  webpackChunkName: "Reacticoon__DashboardPage" */ '../pages/dashboard')
    ),
  },
  {
    definition: routingEnum.REACTICOON_PLUGIN,
    handler: createAsyncPage(() =>
      import(/*  webpackChunkName: "Reacticoon__PluginPage" */ '../pages/plugin')
    ),
  },
  {
    definition: routingEnum.REACTICOON_PLUGINS,
    handler: createAsyncPage(() =>
      import(/*  webpackChunkName: "Reacticoon__PluginsPage" */ '../pages/plugins')
    ),
  },
  {
    definition: routingEnum.REACTICOON_ROUTING,
    handler: createAsyncPage(() =>
      import(/*  webpackChunkName: "Reacticoon__RoutingPage" */ '../pages/routing')
    ),
  },
  {
    definition: routingEnum.REACTICOON_REPORTS,
    handler: createAsyncPage(() =>
      import(/*  webpackChunkName: "Reacticoon__ReportsPage" */ '../pages/reports')
    ),
  },
  {
    definition: routingEnum.REACTICOON_MY_APP,
    handler: createAsyncPage(() =>
      import(/*  webpackChunkName: "Reacticoon__MyAppPage" */ '../pages/my-app')
    ),
  },
  {
    definition: routingEnum.REACTICOON_MODULE,
    handler: createAsyncPage(() =>
      import(/*  webpackChunkName: "Reacticoon__ModulePage" */ '../pages/module')
    ),
  },
  {
    definition: routingEnum.REACTICOON_REPORT_CHECKUP,
    handler: createAsyncPage(() =>
      import(/*  webpackChunkName: "Reacticoon__ReportCheckupPage" */ '../pages/checkup')
    ),
  },
  {
    definition: routingEnum.REACTICOON_REPORT_CLI_PLUGINS,
    handler: createAsyncPage(() =>
      import(/*  webpackChunkName: "Reacticoon__ReportPluginsPage" */ '../pages/cli-plugins')
    ),
  },
  {
    definition: routingEnum.REACTICOON_REPORT_ANALYZE_BUILD,
    handler: createAsyncPage(() =>
      import(/*  webpackChunkName: "Reacticoon__ReportAnalyzeBuildPage" */ '../pages/analyze-build')
    ),
  },
  {
    definition: routingEnum.REACTICOON_REPORT_ANALYZE_BUNDLE_PHOBIA,
    handler: createAsyncPage(() =>
      import(
        /*  webpackChunkName: "Reacticoon__ReportAnalyzeBundlePhobiaPage" */ '../pages/analyze-bundle-phobia'
      )
    ),
  },
]

export default {
  routes,
  routingEnum,
}
