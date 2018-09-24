import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as uiReducer } from 'redux-ui'
import { i18nReducer } from '../../i18n/index'

const configureRootReducer = appOptions => {
  let reducers = {
    // entities are defined by the project.
    // It is an object, so we have to use combineReducers.
    entities: combineReducers(appOptions.entities),

    i18n: i18nReducer,

    // to change the name `routing` use the `selectLocationState` option for `syncHistoryWithStore`
    // function.
    // react-router-redux must have a configured middleware. See `commonMiddlewares.js`
    routing: routerReducer,

    ui: uiReducer,

    ux: appOptions.uxReducer,
  }

  // remove null reducers
  reducers = pickBy(reducers, identity)

  const rootReducer = combineReducers(reducers)

  return rootReducer
}

export default configureRootReducer