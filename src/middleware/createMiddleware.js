//
// utility to create a middleware function. Avoid boilerplate.
//
// Example:
//
// ```
// const middleware = createMiddleware(Action.REQUEST, ({ getState, dispatch, next, action }) => {
//
// })
// ```
//
//
import findIndex from 'lodash/findIndex'
import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import isNull from 'lodash/isNull'
import invariant from 'invariant'

// Any middleware can return this value, to force stop the propagation of the action
// A 'normal' middleware would just return a nil value, but createMiddleware handle a nil return
// value as a specific behavior: when received nil value, it will call `next(action)`. It allow us
// to avoid putting the `return next(action)` on every middleware we create via `createMiddleware`.
// and force us to explicitely use `createMiddleware.STOP_PROPAGATION` if we wants to stop the
// propagation. A 'normal' middleware would return nil or not returns anaything. That creates
// an implicit behavior that we don't want.
const STOP_PROPAGATION = -1

/**
 * @param {string} middlewareName
 *
 * @param  {any} actionsToHandleParam can either be:
 *                                    - function: (action) -> bool
 *                                    - array of `type` constants
 *                                    - `type` constant
 * @param  {func} func                the body of the middleware
 *
 * Returns an object defining the middleware.
 * Will be converted to a middleware on `generateMiddlewares`
 */
const createMiddleware = (middlewareName, actionsToHandleParam, func) => {
  invariant(!isEmpty(middlewareName) && isString(middlewareName), `${middlewareName} missing`)
  invariant(!isNil(actionsToHandleParam), `${middlewareName} nil actions`)
  invariant(isFunction(func), 'middleware must be a function')

  if (isFunction(actionsToHandleParam) && actionsToHandleParam.TYPE) {
    // the user gives an action as actionsToHandleParam, we need to use the type
    actionsToHandleParam = actionsToHandleParam.TYPE
  }

  return {
    middlewareName,
    actions: actionsToHandleParam,
    // fromAppMiddleware is true when the middleware is called by the `appMiddleware`
    // otherwise, it is undefined
    handler: ({ getState, dispatch, fromAppMiddleware = false }) => next => action => {
      let actionsToHandle = actionsToHandleParam

      let res = null

      //
      if (typeof action === 'object' && action.hasOwnProperty('type')) {
        let toHandle = false

        if (isFunction(actionsToHandle)) {
          // actionsToHandle is a function, that will return a boolean telling us if the middleware
          // has to handle the action or not
          toHandle = actionsToHandle(action)
        } else if (fromAppMiddleware === true) {
          // if this middleware is called by the `appMiddleware`, and the actionsToHandle is defined
          // (not a function), we are sure that we have to apply this middleware
          // `appMiddleware` avoid us to calculate if this middleware should be handled here.
          toHandle = true
        } else {
          // the middleware is not called by the `appMiddleware`, and actionsToHandle is not a function
          // we calculate if this middleware should be handled

          // handle actionsToHandleParam as array of actions and as a single action: we pass it to an
          // array
          if (!isArray(actionsToHandleParam)) {
            actionsToHandle = [actionsToHandleParam]
          }

          // we handle the action if the array of actionsToHandle contains our current action
          toHandle =
            findIndex(actionsToHandle, actionToHandle => {
              return action.type === actionToHandle
            }) !== -1
        }

        if (toHandle) {
          res = func({
            getState,
            dispatch,
            next,
            action,
          })

          // action should stop if the middleware returns `STOP_PROPAGATION`
          if (res !== STOP_PROPAGATION) {
            // allow us to avoid putting the final `return next(action)` on every middleware we create
            // via `createMiddleware`
            // Plus instead of returning nil (or forget to return something), we force the middleware
            // to explicitely return `createMiddleware.STOP_PROPAGATION` if we want that middleware
            // to stop the propagation.
            return isNil(res) ? next(action) : res
          }
        }
      }

      //
      if (isNull(res) || res !== STOP_PROPAGATION) {
        return next(action)
      }

      return undefined
    },
  }
}

createMiddleware.STOP_PROPAGATION = STOP_PROPAGATION

export default createMiddleware
