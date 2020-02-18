import { applyMiddleware } from 'redux'
import Immutable from 'immutable'
import get from 'lodash/get'

import createStoreCustom from './createStoreCustom'

import { composeWithDevTools } from 'redux-devtools-extension'

import generateMiddlewares from './generateMiddlewares'

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
  serialize: {
    immutable: Immutable,
  },
})

const configureStore = appOptions => {
  const store = createStoreCustom(appOptions)(
    appOptions.rootReducer,
    appOptions.preloadedState || {},
    composeEnhancers(
      applyMiddleware(
        ...generateMiddlewares(true, [
          ...(appOptions.devMiddlewares || []),
          ...(appOptions.middlewares || []),
        ])
      )
    )
  )

  return store
}

export default configureStore
