import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'
import forEach from 'lodash/forEach'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { i18nReducer } from '../../i18n/index'
import ReducerRegistry from '../registry/ReducerRegistry'
import { getHistory } from 'reacticoon/routing'
import { connectRouter } from 'connected-react-router'

const configureRootReducer = appOptions => {
  let reducers = {
    // entities are defined by the project.
    // It is an object, so we have to use combineReducers.
    ...appOptions.reducers,

    i18n: i18nReducer,

    // to change the name `routing` use the `selectLocationState` option for `syncHistoryWithStore`
    // function.
    // react-router-redux must have a configured middleware. See `commonMiddlewares.js`
    routing: routerReducer,

    ux: appOptions.uxReducer,

    router: connectRouter(getHistory()),
  }

  // remove null reducers
  reducers = pickBy(reducers, identity)

  forEach(reducers, (reducer, reducerName) => ReducerRegistry.register(reducerName, reducer))

  const rootReducer = combineReducers(reducers)
  return rootReducer
}

export default configureRootReducer
