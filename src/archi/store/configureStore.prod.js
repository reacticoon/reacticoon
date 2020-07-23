import { applyMiddleware } from 'redux'

import createStoreCustom from './createStoreCustom'

import generateMiddlewares from './generateMiddlewares'

const configureStore = appOptions =>
  createStoreCustom(appOptions)(
    appOptions.rootReducer,
    appOptions.preloadedState || {},
    applyMiddleware(
      ...generateMiddlewares(false, [
        // TODO: remove
        ...(appOptions.prodMiddlewares || []),
        ...(appOptions.middlewares || []),
      ])
    )
  )

export default configureStore
