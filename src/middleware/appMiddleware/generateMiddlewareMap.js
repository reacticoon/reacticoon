import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'

import { OTHER_MIDDLEWARES } from './constants'

//
// generate a middleware map:
// key => the action
// value => list of middlewares to call for the
//
// The key `OTHER_MIDDLEWARES` contains all the middlewares that don't belong to a specific action:
// - legacy middlewares (functions)
// - middleware 'actions' that is a function
//
// @param appMiddlewares: array of middlewares data created via `createMiddlewares`
// Middleware data contains:
// - actions: string|array|function that defines the action type(s) that the middleware handle
// - handler: middleware function to call
//
//
const generateMiddlewareMap = appMiddlewares => {
  const middlewareMap = {
    // see `OTHER_MIDDLEWARES`
    [OTHER_MIDDLEWARES]: [],
  }

  //
  // generate middlewareMap
  //
  appMiddlewares.forEach(middleware => {
    if (isFunction(middleware)) {
      // TODO: warn in dev
      // this middleware has not been created by createMiddleware (legacy)
      // we add it as a
      middlewareMap[OTHER_MIDDLEWARES].push(middleware)
    } else {
      const { actions, handler } = middleware

      // actions can be of three different types:
      // - string
      // - array of string
      // - function
      //
      handler.middlewareName = middleware.middlewareName

      // a same handler for multiple different actions
      if (isArray(actions)) {
        actions.forEach(action => {
          if (!middlewareMap[action]) {
            middlewareMap[action] = []
          }
          middlewareMap[action].push(handler)
        })
      } else if (isFunction(actions)) {
        middlewareMap[OTHER_MIDDLEWARES].push(handler)
      } else {
        const action = actions
        if (!middlewareMap[action]) {
          middlewareMap[action] = []
        }
        middlewareMap[action].push(handler)
      }
    }
  })

  return middlewareMap
}

export default generateMiddlewareMap
