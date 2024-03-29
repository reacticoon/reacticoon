import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
// import Immutable from 'immutable'

import ApiManager from './ApiManager'

import { API_CALL, TYPES, REQUEST, DATA, META } from '../api/constants'
import { getCustomApiCaller } from './config'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (request, schema = null) => {
  return new Promise((resolve, reject) => {
    const success = json => {
      const camelizedJson = camelizeKeys(json)

      const data = !schema ? camelizedJson : Object.assign({}, normalize(camelizedJson, schema))

      resolve(data)
      // resolve(Immutable.fromJs(data))
    }

    const failure = json => {
      reject(json)
    }

    request.success = success
    request.failure = failure

    let useDefault = true

    const customApiCaller = getCustomApiCaller()
    if (customApiCaller) {
      // customApiCaller can return true if we want to fallback to our default implementation
      useDefault = customApiCaller(request) === true
    }

    if (useDefault) {
      ApiManager.run(request)
    }
  })
}

// A Redux middleware that interprets actions with API_CALL info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const apiCall = action[API_CALL]

  if (typeof apiCall === 'undefined') {
    return next(action)
  }

  const request = apiCall[REQUEST]
  const types = apiCall[TYPES]
  const data = apiCall[DATA]
  const meta = apiCall[META]

  let { endpoint } = request

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  const { schema } = request

  // if (!schema) {
  //   throw new Error('Specify one of the exported Schemas.')
  // }

  if (!Array.isArray(types) || types.length !== 6) {
    throw new Error('Expected an array of 6 action types.')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[API_CALL]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(
    actionWith({
      type: requestType,
      request: request,
      // TODO: remove data for payload
      // data: data,
      payload: data,
      meta,
    })
  )

  return callApi(request, schema)
    .then(response =>
      next(
        actionWith({
          type: successType,
          response,
          // TODO: remove data for payload
          // data: data,
          payload: data,        
          meta,
        })
      )
    )
    .catch(apiError =>
      next(
        actionWith({
          type: failureType,
          apiError,
          // TODO: remove data for payload
          // data: data,
          payload: data, 
          meta,
        })
      )
    )
}
