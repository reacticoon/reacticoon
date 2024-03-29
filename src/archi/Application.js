import React from 'react'

import invariant from 'invariant'
import isNil from 'lodash/isNil'

import { render } from 'react-dom'
// hot loader inserted by create-reacticoon-app
import { createBrowserHistory } from 'history'

import configureRootReducer from './utils/configureRootReducer'
import generateEnvironment from './generateEnvironment'

import { beginMark, endMark } from 'reacticoon/performance'
import { setCurrentEnv } from '../environment'
import { registerModules } from '../module'
import OnModuleRegistered from './events/OnModuleRegistered'
import { registerHistory, registerAppRouting } from '../routing/config'
import { registerStore } from '../store'
import { configureI18n } from '../i18n/index'
import { getLogLevel } from 'reacticoon/environment'
import configureStore from './store/configureStore'
import {
  registerPlugins,
  generatePluginEntities,
  generatePluginMiddlewares,
} from '../plugin/config.js'

import ApiManager from '../api/ApiManager'

import { EventManager } from '../event'

import App from './App'

const REACTICOON_KEY_ON_WINDOW = '__REACTICOON__'

/**
 * Entry point of a Reacticoon application. It receives the user configuration (appOptions) and
 * initiate the different Reacticoon modules.
 */
const Application = appOptions => {
  beginMark('Reacticoon Application')

  //
  // Environment
  //

  appOptions.environment = generateEnvironment()

  //
  // Add listeners
  //

  EventManager.addListener(OnModuleRegistered)

  //
  // Verify we do not have multiple versions of Reacticoon
  //
  if (window[REACTICOON_KEY_ON_WINDOW]) {
    throw new Error(`Multiple Reacticoon has been found.`) // TODO: better error
  }
  window[REACTICOON_KEY_ON_WINDOW] = true

  //
  // environment
  // must be handle in first
  //
  const environment = appOptions.environment
  setCurrentEnv(environment)

  console.info(`[Reacticoon][init] LogLevel: ${getLogLevel()}`)

  //
  // routes
  //
  registerAppRouting(appOptions)

  //
  // plugins
  //

  if (__DEV__) {
    // add dev reacticoon plugin on __DEV__.
    appOptions.plugins = [
      {
        plugin: require('reacticoon-plugin-testing/index').default,
        config: {},
      },
      {
        plugin: require('reacticoon-plugin-git/index').default,
        config: {},
      },
      ...(appOptions.plugins || []),
      // must be final to handle 404
      {
        plugin: require('reacticoon-plugin-dev/index').default,
        config: {},
      },
    ]
  }

  registerPlugins(appOptions.plugins, appOptions)

  //
  // generate middlewates
  //
  // allow user to give middleware directly via `appOptions`, which is not registered as a module
  // TODO: drop middlewares support, only support module
  appOptions.middlewares = [...(appOptions.middlewares || []), ...generatePluginMiddlewares()]

  //
  // History
  //

  const history = createBrowserHistory()

  registerHistory(history)

  // TODO: add routing data
  history.listen(location =>
    EventManager.dispatch(EventManager.Event.ON_HISTORY_CHANGE, {
      location,
    })
  )

  //
  // root reducer
  //

  // generate entities
  // TODO: rename reducers
  // TODO: drop entities support, only support module
  appOptions.reducers = {
    // allow user to give reducer directly via `appOptions`, which is not registered as a module
    ...(appOptions.entities || {}),
    ...generatePluginEntities(),
  }

  appOptions.rootReducer = configureRootReducer(appOptions)

  //
  // store
  //

  const store = configureStore(appOptions)
  registerStore(store)

  //
  // modules
  //

  registerModules(appOptions.modules)

  //
  // I18n
  //

  // TODO: uncomment
  // configureI18n(appOptions.i18n)

  //
  // Api manager
  //

  // TODO: remove
  if (appOptions.ApiManagerOptions) {
    appOptions.ApiManagerOptions.store = store
    ApiManager.configure(appOptions.ApiManagerOptions())
  }

  //
  // Event: ON_APP_INIT
  //

  beginMark('Dispatch ON_APP_INIT')
  EventManager.dispatch(EventManager.Event.ON_APP_INIT, {
    appOptions,
  })
  endMark('ON_APP_INIT dispatched', 'Dispatch ON_APP_INIT')

  endMark('Reacticoon Application started', 'Reacticoon Application')

  // TODO: allow to register events on app
  if (appOptions.onAppInit) {
    appOptions.onAppInit()
  }

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
