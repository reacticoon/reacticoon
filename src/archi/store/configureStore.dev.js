import { applyMiddleware } from 'redux'
import Immutable from 'immutable'

import createStoreCustom from './createStoreCustom'

import { composeWithDevTools } from 'redux-devtools-extension'

import generateMiddlewares from './generateMiddlewares'

const composeEnhancers = composeWithDevTools({
  serialize: {
    immutable: Immutable,
  },
})

const configureStore = appOptions =>
  createStoreCustom(appOptions)(
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

export default configureStore
