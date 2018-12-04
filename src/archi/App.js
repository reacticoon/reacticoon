import React from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { Router } from 'react-router'

import { getRoutes } from '../routing/config'
import configureRoutes from './utils/configureRoutes'
import ErrorBoundary from './components/ErrorBoundary'

const App = ({ store, history, appOptions }) => {
  const router = <Router history={history} routes={configureRoutes({ routes: getRoutes() })} />

  return (
    <ErrorBoundary>
      <Provider store={store}>
        {/* TODO: provide way to plugins to add container here. E.g PersistGate */}
        <appOptions.Content>{router}</appOptions.Content>
      </Provider>
    </ErrorBoundary>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired,
}

// apply hot reload
// https://github.com/gaearon/react-hot-loader
export default hot(module)(App)
