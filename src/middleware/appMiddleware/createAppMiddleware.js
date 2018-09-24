import isNil from 'lodash/isNil'
import invariant from 'invariant'

import { OTHER_MIDDLEWARES } from './constants'
import generateMiddlewareMap from './generateMiddlewareMap'

//
// appMiddlewares correspond to the config/middlewares.
// middlewares can be created via `createMiddleware`, or can be a function (legacy).
// `createMiddleware` gives us an object describing the middleware. We use this object to create
// a single optimized middleware here.
//

const createAppMiddleware = appMiddlewares => {
  const middlewareMap = generateMiddlewareMap(appMiddlewares)

  //
  // The app middleware.
  // We pass a single `appMiddleware` to the store. This middleware will handle all our middlewares
  // configured (on `config/middlewares`).
  //
  // improve performances: instead of passing by each registered middleware for each action, we
  // use the `middlewareMap` to know which middlewares to call for the given action.
  // We don't have to calculate for each dispatch weither or not a middleware apply for the action,
  // except for middlewares that defines `actions` as a function.
  //
  // add dev debug when we change the current action / stop the dispatch (middlewared returned nil)
  //
  // Inspired by https://sourcegraph.com/github.com/reactjs/redux@master/-/blob/src/applyMiddleware.js
  //
  //
  const appMiddleware = ({ getState, dispatch }) => next => action => {
    const middlewaresForAction = middlewareMap[action.type] || []

    // TODO: on dev only + better display
    if (middlewaresForAction.length !== 0) {
      console.info(
        `[${action.type}]: middlewares: ${middlewaresForAction
          .map(middleware => middleware.middlewareName || 'Unknwon middleware name')
          .join(', ')}`
      )
    }

    // first call actions that correspond to the key
    // then call actions we don't know the key
    const middlewares = middlewaresForAction.concat(middlewareMap[OTHER_MIDDLEWARES])

    const middlewareAPI = {
      getState,
      dispatch,
      fromAppMiddleware: true,
    }

    // contains the action to use
    // TODO: freeze nextAction in dev?
    let nextAction = action

    // call each middleware
    middlewares.forEach(middleware => runMiddleware(middleware, middlewareAPI, nextAction))

    // there is a next action, we call the real `next` function, so the action will continued to be
    // dispatched among the store middlewares
    if (!isNil(nextAction)) {
      return next(nextAction)
    }
  }

  //
  // Utils
  //

  //
  // function called to run a middleware.
  //
  const runMiddleware = (middleware, middlewareAPI, nextAction) => {
    // call middleware.
    // we pass customNext instead of next to handle the nextAction here
    // we pass the nextAction, that is the action given by the previous middleware via a call to
    // `next` function (that correspond to the `customNext` function here)
    if (isNil(nextAction)) {
      return false // quit loop
    }

    // we need to pass our custom next function to the middleware
    const customNext = createCustomNextAction(nextAction)

    const res = middleware(middlewareAPI)(customNext)(nextAction)

    // the middleware returns undefined, we stop the propagation of the action
    if (!res) {
      // TODO: add middleware name
      // quit forEach loop since the middleware returned undefined.
      // The middleware asked to stop
      // TODO: dev only
      // TODO: add middleware name
      console.debug('no next action for ' + nextAction.type)
      // quit loop
      return false
    }
    // else we have a result, we don't do anything
  }

  //
  // we must define a custom next function, that replace the normal `next` function in our
  // appMiddleware. It works the same way as the `next` function, but in the context of our
  // appMiddleware.
  // It also handle dev debug
  //
  // handleNextAction is the custom `next` function.
  //
  const handleNextAction = (currentAction, newNextAction) => {
    invariant(
      !isNil(newNextAction),
      `middleware next function called with nil action parameter for action ${currentAction.type}`
    )

    // debug
    // TODO: dev only
    if (currentAction.type !== newNextAction.type) {
      console.info('changed current action: ', currentAction, newNextAction)
    }
    // save the action called by the middleware `next` function
    currentAction = Object.freeze(newNextAction)
    // TODO: freeze nextAction in dev?

    // since we do `return next(action)` in the middlewares, we need to return something here
    //
    return newNextAction
  }

  // create a custom 'next' function, that will call `handleNextAction` with the currentAction
  // (nextAction), used for debug purposes
  const createCustomNextAction = currentAction => newNextAction =>
    handleNextAction(currentAction, newNextAction)

  //
  //
  //

  // returns the created appMiddleware
  return appMiddleware
}

export default createAppMiddleware
