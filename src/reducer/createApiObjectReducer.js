import Immutable from 'immutable'
import invariant from 'invariant'
import { isActionType } from 'reacticoon/action'
import isFunction from 'lodash/isFunction'
import isUndefined from 'lodash/isUndefined'
import isEmpty from 'lodash/isEmpty'
import { RequestStatus } from 'reacticoon/api/constants'

/**
 * Generate a simple reducer with basic REQUEST / SUCCESS / FAILURE / CANCEL
 * @param  {string} actionType  Action to be reduced
 * @return {Immutable}          Updated state
 */

const DEFAULT_STATE = Immutable.fromJS({})

const handleRequest = (state, action, options) => {
  state = state.set('meta', action.meta || null)
  state = state.set('isPending', true) 
  state = state.set('error', null)
  state = state.set('status', RequestStatus.PENDING)

  if (action.payload?._data) {
    return state.set('data', action.payload?._data)
  }
  
  if (action.payload?.keepDataOnRequest || options.keepDataOnRequest
    || action.payload?.resetDataOnRequest === false || options.resetDataOnRequest === false) {
    return state
  }

  return state.set('data', null)
}

const handleSuccess = (state, action) =>
  state.merge({
    data: action.response,
    isPending: false,
    error: null,
    status: RequestStatus.LOADED,
  })

const handleFailure = (state, action) =>
  state.merge({
    data: null,
    isPending: false,
    // TODO: does action.error exists ?
    error: action.apiError || action.error,
    status: RequestStatus.FAILED,
  })

const handleCancel = (state, action) =>
  state.merge({
    data: null,
    isPending: false,
    error: null,
    status: RequestStatus.CANCEL,
  })

const handleReset = (state, action) => 
  state.merge({
    data: null,
    isPending: false,
    meta: null,
    error: null,
    status: null,
  })

const handleSetData = (state, action) => 
  state.merge({
    data: action.payload.data,
  })

const handleAction = (defaultReducer, getProp, additionalReducer, overrideReducer, options) => {
  return (state, action) => {
    const path = getProp(action)

    if (!path || isEmpty(path.filter(Boolean))) {
      return state
    }

    let newObjectState
    if (overrideReducer) {
      newObjectState = overrideReducer(state.getIn(path) || Immutable.fromJS({}), action, options)
    } else {
      newObjectState = defaultReducer(state.getIn(path) || Immutable.fromJS({}), action, options)
    }

    if (additionalReducer) {
      newObjectState = additionalReducer(newObjectState, action, options)
    }

    return state.setIn(path, Immutable.fromJS(newObjectState))
  }
}

/**
 * Creates a reducer that handles an api call action (created via `createApiCallAction`).
 * - REQUEST
 * - SUCCESS
 * - FAILURE
 * - CANCEL
 *
 * It allows to add additionnal action handling, via the `reducer` parameter.
 *
 * @param {function} actionType the action to handle (created via `createApiCallAction`)
 * @param {function} getProp function that receives props and return the identifier to use.
 *  types.
 * @param {function} reducer optionnal. Additionnal reducer function that will handle other action
 *  types.
 * @param {object} additionalReducers optionnal. Object (key: action type, value: reducer). Custom
 * reducer functions that does not replace the default reducer functions, but are called after the
 * default reducer function. Allows to reduce more than the default behavior for an api call actions
 */
const createApiObjectReducer = (actionType, getProp, options = { resetDataOnRequest: true, reducer: null, overrideReducers: {}, additionalReducers: {} }) => {
  invariant(isActionType(actionType), `actionType must be defined`)

  const { reducer = null,  additionalReducers = {}, overrideReducers = {} } = options
  
  //
  // define handlers
  //
  const handlers = {
    [actionType.REQUEST]: handleAction(
      handleRequest,
      getProp,
      additionalReducers[actionType.REQUEST],
      overrideReducers[actionType.REQUEST],
      options
    ),
    [actionType.SUCCESS]: handleAction(
      handleSuccess,
      getProp,
      additionalReducers[actionType.SUCCESS],
      overrideReducers[actionType.SUCCESS],
      options
    ),
    [actionType.FAILURE]: handleAction(
      handleFailure,
      getProp,
      additionalReducers[actionType.FAILURE],
      overrideReducers[actionType.FAILURE],
      options
    ),
    [actionType.CANCEL]: handleAction(
      handleCancel, 
      getProp, 
      additionalReducers[actionType.CANCEL],
      overrideReducers[actionType.CANCEL],
      options
    ),
    [actionType.RESET]: handleAction(
      handleReset, 
      getProp, 
      additionalReducers[actionType.RESET],
      overrideReducers[actionType.RESET],
      options
    ),
    [actionType.SET_DATA]: handleAction(
      handleSetData, 
      getProp, 
      additionalReducers[actionType.SET_DATA],
      overrideReducers[actionType.SET_DATA],
      options
    ),
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

createApiObjectReducer.DEFAULT_STATE = DEFAULT_STATE

export default createApiObjectReducer
