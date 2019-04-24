import Immutable from 'immutable'
import invariant from 'invariant'
import { isActionType } from 'reacticoon/action'
import isFunction from 'lodash/isFunction'
import isUndefined from 'lodash/isUndefined'

/**
 * Generate a simple reducer with basic REQUEST / SUCCESS / FAILURE
 * @param  {string} actionType  Action to be reduced
 * @return {Immutable}          Updated state
 */

const DEFAULT_STATE = Immutable.fromJS({
  data: null,
  isFetching: false,
  error: null,
})

const handleRequest = (state, action) => state.merge({
  data: null,
  isFetching: true,
  error: null,
})

const handleSuccess = (state, action) => state.merge({
  data: action.response,
  isFetching: false,
  error: null,
})

const handleFailure = (state, action) => state.merge({
  data: null,
  isFetching: false,
  // TODO: does action.error exists ?
  error: action.apiError || action.error,
})

const handleAction = (defaultReducer, additionalReducer) => {
  return (state, action) => {
    const newState = defaultReducer(state, action)

    if (additionalReducer) {
      return additionalReducer(newState, action)
    }
    return newState
  }
}

/**
 * Creates a reducer that handles an api call action (created via `createApiCallAction`).
 * - REQUEST
 * - SUCCESS
 * - FAILURE
 * 
 * It allows to add additionnal action handling, via the `reducer` parameter.
 * 
 * @param {function} actionType the action to handle (created via `createApiCallAction`)
 * @param {function} reducer optionnal. Additionnal reducer function that will handle other action 
 *  types.
 * @param {object} additionalReducers optionnal. Object (key: action type, value: reducer). Custom 
 * reducer functions that does not replace the default reducer functions, but are called after the 
 * default reducer function. Allows to reduce more than the default behavior for an api call actions
 */
const createApiReducer = (actionType, reducer: Function = null, additionalReducers = {}) => {
  invariant(isActionType(actionType), `actionType must be defined`)
  
  //
  // define handlers
  //
  const handlers = {
    [actionType.REQUEST]: handleAction(handleRequest, additionalReducers[actionType.REQUEST]),
    [actionType.SUCCESS]: handleAction(handleSuccess, additionalReducers[actionType.SUCCESS]),
    [actionType.FAILURE]: handleAction(handleFailure, additionalReducers[actionType.FAILURE]),
  }

  return (state = DEFAULT_STATE, action) => {
    const handler = handlers[action.type]

    if (handler) {
      return handler(state, action)
    } else if (reducer !== null) {
      invariant(isFunction(reducer), 'reducer must be a function')
      const res = reducer(state, action)
      invariant(!isUndefined(res), 'reducer returned undefined')
      return res
    }
    return state
  }
}

export default createApiReducer
