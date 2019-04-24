//
// create appOptions `entities` config with registered modules
//
import forOwn from 'lodash/forOwn'
import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import invariant from 'invariant'
import { __DEV__ } from '../environment'

/**
 * Generate an array of the middlewares defined on our modules.
 * It is defined on the middleware via `middlewares` key.
 * It can be:
 * - an array of middlewares
 * - an object of middlewares (in case we use `import * as middlewares from './middlewares'`)
 * Note: when `middlewares` is an object, each value of the object MUST be a middleware
 *
 */
const generateModuleMiddlewares = modules => {
  const middlewares = []

  forOwn(modules, (module, key) => {
    if (isArray(module.content.middlewares)) {
      module.content.middlewares.forEach((middleware, index) => {
        invariant(
          isFunction(middleware.handler),
          `Middleware ${module.name}::${middleware.middlewareName} is not a function`
        )

        // function.name is read only
        // a middleware as it's name set as "" since we create it via 'createMiddleware', who
        // returns an anonymous function
        // we don't have a nice name to display, so we display the module name, and its index
        middleware.middlewareName = middleware.middlewareName || `${module.name} ${index}`

        addDevDataToMiddleware(middleware, module)

        middlewares.push(middleware)
      })
    } else {
      forOwn(module.content.middlewares || {}, (middleware, middlewareName) => {
        invariant(
          isFunction(middleware.handler),
          `Middleware ${module.name}::${middleware.middlewareName} is not a function`
        )
        // function.name is read only
        // a middleware as it's name set as "" since we create it via 'createMiddleware', who
        // returns an anonymous function
        middleware.middlewareName = middleware.middlewareName || middlewareName

        addDevDataToMiddleware(middleware, module)

        middlewares.push(middleware)
      })
    }
  })

  return middlewares
}

const addDevDataToMiddleware = (middleware, module) => {
  if (__DEV__) {
    middleware._moduleName = module.name
    middleware.toString = () => `[middleware] ${module.name}::${middleware.middlewareName}`
  }
}

export default generateModuleMiddlewares
