// inspired by https://github.com/reduxjs/redux-thunk/blob/master/src/index.js
// we need our custom thunk to handle debug

import { __DEV__ } from 'reacticoon/environment'

// https://stackoverflow.com/questions/13227489/how-can-one-get-the-file-path-of-the-caller-function-in-node-js
function getStack() {
  // Save original Error.prepareStackTrace
  let origPrepareStackTrace = Error.prepareStackTrace

  // Override with function that just returns `stack`
  Error.prepareStackTrace = function(_, stack) {
    return stack
  }

  // Create a new `Error`, which automatically gets `stack`
  let err = new Error()

  // Evaluate `err.stack`, which calls our new `Error.prepareStackTrace`
  let stack = err.stack

  // Restore original `Error.prepareStackTrace`
  Error.prepareStackTrace = origPrepareStackTrace

  return stack
}

const getStackTrace = function() {
  const stack = getStack()
  // Remove superfluous function call on stack
  stack.shift()
  stack.shift()
  stack.shift()

  // TODO: transform to readable stack trace with source map

  return stack.toString()
}

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    const isFunction = typeof action === 'function'

    let debugData = null
    // TODO: better handling
    if (__DEV__ && (action.debug || isFunction)) {
      debugData = {
        stacktrace: getStackTrace(),
      }
    }

    if (isFunction) {
      dispatch.debugData = debugData
      return action(dispatch, getState, extraArgument)
    }

    action.debugData = debugData
    return next(action)
  }
}

const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware

export default thunk
