
// Action key that carries API call info interpreted by this Redux middleware.
// The data have to be formatted like:
// {
//  TYPES: {},
//  REQUEST: {}
// }
//
//
//
export const API_CALL = 'API::API_CALL'

//
// The constants to attach to the actions
// have to contains three values: [ requestType, successType, failureType ]
// Example: types: [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE ]
// Have to be set on API_CALL
export const TYPES = 'API::API_CALL::TYPES'

//  REQUEST: {
//   type: 'GET',
//   schema: OAuthSchema,
//   endpoint: ApiEndpoints.LOGIN,
//   headers: {
//     'Accept': 'application/x-www-form-urlencoded',
//   },
//   data: {
//   }
//   }
//
// See api/UserApi.login for example
export const REQUEST = 'API::API_CALL::REQUEST'

/**
 * Additionnal data to attach to the action.
 * This data is used on reducers when handling request actions. It allows modification of the
 * state before the API call ended.
 * For non-critical requests that should not fail, use it to update the state directly without
 * waiting for the request response.
 * It allows a 'instant ui modification' look alike for out app.
 */
export const DATA = 'API::API_CALL::DATA'