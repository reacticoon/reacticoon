import React from 'react'

import invariant from 'invariant'
import isNil from 'lodash/isNil'

import { render } from 'react-dom'

// hot loader
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureRootReducer from './utils/configureRootReducer'

import { setCurrentEnv } from '../environment'
import { registerModules, getModules } from '../module'
import generateModuleEntities from '../module/generateModuleEntities'
import generateModuleMiddlewares from '../module/generateModuleMiddlewares'
import { registerHistory } from '../routing/config'
import { registerStore } from '../store'
import { registerRoutingEnum } from '../routing/config'
import { configureI18n } from '../i18n/index'
import configureStore from './store/configureStore'
import {
  registerPlugins,
  generatePluginEntities,
  generatePluginMiddlewares,
} from '../plugin/config.js'

import ApiManager from '../api/ApiManager'

import { EventManager } from '../event'

import App from './App'

//
// TODO:
// - add appOptions callback post Application configuration (pre render)
//
const Application = appOptions => {
  //
  // environment
  // must be handle in first
  //
  const environment = appOptions.environment
  setCurrentEnv(environment)

  //
  // modules
  //

  registerModules(appOptions.modules)

  //
  // plugins
  //

  registerPlugins(appOptions.plugins, appOptions)

  //
  // generate entities
  //
  appOptions.entities = {
    // allow user to give reducer directly via `appOptions`, which is not registered as a module
    ...(appOptions.entities || {}),
    ...generateModuleEntities(getModules()),
    ...generatePluginEntities(),
  }

  //
  // generate middlewates
  //
  // allow user to give middleware directly via `appOptions`, which is not registered as a module
  appOptions.middlewares = [
    ...(appOptions.middlewares || []),
    ...generateModuleMiddlewares(getModules()),
    ...generatePluginMiddlewares(),
  ]

  //
  // root reducer
  //

  appOptions.rootReducer = configureRootReducer(appOptions)

  //
  // store
  //

  const store = configureStore(appOptions)
  registerStore(store)

  //
  // I18n
  //

  configureI18n(appOptions.i18n)

  //
  // routes
  //
  registerRoutingEnum(appOptions.RoutingEnum)

  //
  // History
  //

  // We must have react-router-redux v4.0.* (currently 4.0.8)
  // see:
  // https://github.com/reactjs/react-router-redux/issues/348
  const history = syncHistoryWithStore(browserHistory, store)

  registerHistory(history)

  //
  // Api manager
  //

  // TODO: remove
  appOptions.ApiManagerOptions.store = store

  ApiManager.configure(appOptions.ApiManagerOptions)

  //
  // Event: ON_APP_INIT
  //

  EventManager.dispatch(EventManager.Event.ON_APP_INIT, {
    appOptions,
  })

  //
  // RENDER
  //

  invariant(!isNil(appOptions.Content), '[configuration] missing "Content" component')

  const rootElement = appOptions.rootElement || document.getElementById('root')

  const renderApp = App => {
    render(<App store={store} history={history} appOptions={appOptions} />, rootElement)
  }

  renderApp(App)
}

export default Application
