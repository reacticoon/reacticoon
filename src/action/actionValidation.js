//
// https://github.com/redux-utilities/flux-standard-action/blob/master/src/index.js
//
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'

export function isFSA(action) {
  return isPlainObject(action) && isString(action.type) && Object.keys(action).every(isValidKey)
}

export function isError(action) {
  return isFSA(action) && action.error === true
}

function isValidKey(key) {
  return ['type', 'payload', 'error', 'meta'].indexOf(key) > -1
}
