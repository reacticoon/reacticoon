import React from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { Router } from 'react-router'

import configureRoutes from './utils/configureRoutes'
import ErrorBoundary from './components/ErrorBoundary'

import { getRoutes } from '../routing/config'

/**
 * We need to import routes from here
 * otherwise, HMR thinks it's on higher level and reload the entire page
 * instead of only the page component
 * TODO: remove trick
 */
// import routes from 'app/config/routes'

const App = ({ store, history, appOptions }) => {
  const router = (
    <Router
      history={history}
      routes={configureRoutes({
        routes: getRoutes()
      })(store)}
    />
  )

  return (
    <ErrorBoundary>
      <Provider store={store}>
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
