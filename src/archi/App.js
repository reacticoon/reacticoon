import React from 'react'
import PropTypes from 'prop-types'

import { hot } from 'react-hot-loader'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { getRoutes, getHistory } from '../routing/config'
import configureRoutes from './utils/configureRoutes'
import ErrorBoundary from './components/ErrorBoundary'

const App = ({ store, history, appOptions }) => {
  const router = (
    <ConnectedRouter history={getHistory()}>
      {configureRoutes({
        routes: getRoutes(),
      })}
    </ConnectedRouter>
  )

  return (
    <ErrorBoundary>
      <Provider store={store}>
        {/* 
        TODO: provide way to plugins to add container here. E.g PersistGate.
        cf plugin layoutViews
         */}
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
