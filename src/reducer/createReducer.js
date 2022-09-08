import isEmpty from 'lodash/isEmpty'
import Immutable from 'immutable'
import invariant from 'invariant'

import { isDebugLogLevel } from 'reacticoon/environment'
import { EventManager } from 'reacticoon/event'
import { getCircularCulprit } from 'reacticoon/utils'

/*
 * create a reducer.
 *
 * @param initialState
 * @param fnMap: object with:
 *      - key: the action type
 *      - value: function (state, action)
 *
 */
const createReducer = (initialState, fnMap) => {
  const reducer = (state = Immutable.fromJS(initialState), action) => {
    const handler = fnMap[action.type]

    try {
      const newState = handler ? handler(state, action) : state
      invariant(newState !== undefined, `reducer returned undefined.`)
      return newState
    } catch (e) {
      handleReducerException(e, handler, action)
    }
    return state
  }

  if (isDebugLogLevel()) {
    reducer.__fnMap = fnMap
  }

  return reducer
}

/**
 * Handle exception thrown on our reducer handler function.
 * The goal here is too handle specific errors than can happen and describe how to fix them.
 *
 * We display the error on a 'reducer error' group, so we can group our different informations.
 */
function handleReducerException(e, handler, action) {
  // handle infinite loop
  console.group('reducer error')
  console.info(
    `An error occured on your reducer handler function '${handler.name}'
     Action type: ${action.type}`
  )
  console.info(action)

  if (e.message === 'Maximum call stack size exceeded') {
    // TODO: add documentation page to learn more about this error.
    console.log(`
      Maximum call stack size exceeded: this error occured because you have an infite loop on your reducer.
      Verify that:
      - There is no circular reference on your data (espacially if you are using immutablejs)
      - There is no exception object on the data to save on the store
      - Your functions calls does not lead to an infinite loop
    `)

    const circularCulprit = getCircularCulprit(action)
    if (!isEmpty(circularCulprit)) {
      console.log('You will find below the potential circular references:')
      console.log(circularCulprit)
    }

    // do not give action to avoid infinite loop elsewhere (save event on store on dev plugin for
    // example)
    EventManager.dispatch(EventManager.Event.LOG_EXCEPTION, { ex: e })
  } else {
    EventManager.dispatch(EventManager.Event.LOG_EXCEPTION, { ex: e, action })
  }
  console.error(e)
  console.groupEnd('reducer error')
}

export default createReducer
