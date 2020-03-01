import isFunction from 'lodash/isFunction'

import createApiEnumAction from '../api/utils/createApiEnumAction'
import { getParamNames, defineFunctionName } from 'reacticoon/utils'
import { API_CALL, TYPES, REQUEST, DATA } from '../api/constants'

const getData = (dataOrCallback, params) =>
  isFunction(dataOrCallback) ? dataOrCallback.apply(null, params) : dataOrCallback

/**
 *
 * @param {*} type ex: 'POST::BOOOKMARK'
 * @param {*} request api call or function. Function will receive arguments sent to the action
 * @param {*} data object or function. Function will receive arguments sent to the action
 */
const createApiCallAction = (type, request, data = null) => {
  const actionType = createApiEnumAction(type)
  const func = (...params) => {
    // TODO: refactor createApiCallAction to follow flux-standard-action
    // const action = {
    //   type: API_CALL,
    //   payload: getData(request, params),
    //   meta: {
    //     [TYPES]: [actionType.REQUEST, actionType.SUCCESS, actionType.FAILURE],
    //     [REQUEST]: getData(request, params),
    //   }
    // }
    const action = {
      [API_CALL]: {
        [TYPES]: [actionType.REQUEST, actionType.SUCCESS, actionType.FAILURE],
        [REQUEST]: getData(request, params),
        [DATA]: getData(data, params),
      },
    }

    return action
  }

  //
  // add constants to the function. Allow to access constants via the action.
  // Ex: myAction.REQUEST
  // Used on middlewares and reducers
  //
  func.REQUEST = actionType.REQUEST
  func.SUCCESS = actionType.SUCCESS
  func.FAILURE = actionType.FAILURE

  // requried by `isActionType`
  func.isActionType = true
  func.TYPE = API_CALL
  func.__type = type
  func.toString = () => `${API_CALL} ${type}`

  if (FEATURE_REACTICOON_HEAVY_DEBUG) {
    func.__parameters = isFunction(request) ? getParamNames(request) : []
    defineFunctionName(func, `ApiCallAction ${API_CALL} ${type}`)
  }

  return func
}

export default createApiCallAction
