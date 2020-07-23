import Immutable from 'immutable'
import invariant from 'invariant'
import { isActionType } from 'reacticoon/action'
import isFunction from 'lodash/isFunction'
import isUndefined from 'lodash/isUndefined'
import { RequestStatus } from 'reacticoon/api/constants'

/**
 * Generate a simple reducer with basic REQUEST / SUCCESS / FAILURE / CANCEL
 * @param  {string} actionType  Action to be reduced
 * @return {Immutable}          Updated state
 */

const DEFAULT_STATE = Immutable.fromJS({
  data: null,
  isPending: false,
  error: null,
  status: RequestStatus.NOT_LOADED,
})

const handleRequest = (state, action, options) =>
  state.merge({
    meta: action.meta,
    isPending: true,
    error: null,
    status: RequestStatus.PENDING,
  })
  .merge(options.resetDataOnRequest ? { data: null } : {})

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

const handleAction = (defaultReducer, additionalReducer, options) => {
  return (state, action) => {
    const newState = defaultReducer(state, action, options)

    if (additionalReducer) {
      return additionalReducer(newState, action, options)
    }
    return newState
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
 * @param {function} reducer optionnal. Additionnal reducer function that will handle other action
 *  types.
 * @param {object} additionalReducers optionnal. Object (key: action type, value: reducer). Custom
 * reducer functions that does not replace the default reducer functions, but are called after the
 * default reducer function. Allows to reduce more than the default behavior for an api call actions
 */
const createApiReducer = (actionType, options = { resetDataOnRequest: true, reducer: null, additionalReducers: {} }) => {
  invariant(isActionType(actionType), `actionType must be defined`)

  const { reducer = null,  additionalReducers = {} } = options

  //
  // define handlers
  //
  const handlers = {
    [actionType.REQUEST]: handleAction(handleRequest, additionalReducers[actionType.REQUEST], options),
    [actionType.SUCCESS]: handleAction(handleSuccess, additionalReducers[actionType.SUCCESS], options),
    [actionType.FAILURE]: handleAction(handleFailure, additionalReducers[actionType.FAILURE], options),
    [actionType.CANCEL]: handleAction(handleCancel, additionalReducers[actionType.CANCEL], options),
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
