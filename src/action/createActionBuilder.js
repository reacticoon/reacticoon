//
// @ReacticoonInternal
//
// Creates an action following the [flux-standard-action](https://github.com/redux-utilities/flux-standard-action)
// convention.
//

// An action MUST

// - be a plain JavaScript object.
// - have a type property.
// - An action MAY

// - have an error property.
// - have a payload property.
// - have a meta property.
// - An action MUST NOT include properties other than type, payload, error, and meta.

// type
// The type of an action identifies to the consumer the nature of the action that has occurred.
// type is a string constant. If two types are the same, they MUST be strictly equivalent (using ===).

// payload
// The optional payload property MAY be any type of value. It represents the payload of the action.
// Any information about the action that is not the type or status of the action should be part of
// the payload field.

// By convention, if error is true, the payload SHOULD be an error object. This is akin to rejecting
// a promise with an error object.

// error
// The optional error property MAY be set to true if the action represents an error.
// An action whose error is true is analogous to a rejected Promise. By convention, the payload
// SHOULD be an error object.
// If error has any other value besides true, including undefined and null, the action MUST NOT be
// interpreted as an error.

// meta
// The optional meta property MAY be any type of value. It is intended for any extra information
// that is not part of the payload.

import invariant from 'invariant'

import isNil from 'lodash/isNil'
import isFunction from 'lodash/isFunction'
import isUndefined from 'lodash/isUndefined'

/**
 *
 * @param {object} options
 *  - isError {boolean} true if we create an action that represents an error.
 */
const createActionBuilder = options => {
  const createActionFunc = (type, data) => {
    const actionCreator = (...params) => dispatch => {
      invariant(isNil(data) || isUndefined(data.type), 'data cannot contain a type parameter')

      invariant(!isNil(type), 'type is nil')
      invariant(
        isFunction(dispatch),
        'action is not correctly initialized: const myAction = () => creatAction(...'
      )

      const retrievedData = { ...(isFunction(data) ? data.apply(null, params) : data) }
      
      // the retrieved data can contains the payload or the payload and the meta:
      // { // payload content} OR { payload: {}, meta: {}}

      let payload
      let meta
      if (retrievedData.payload) {
        payload = retrievedData.payload
        meta = retrievedData.meta
      } else {
        payload = retrievedData
      }

      const action = {
        type,
        payload,
        meta,
      }

      if (options.isError) {
        action.error = true
      }

      return dispatch(action)
    }

    //
    // no actions types to define, we just use action.TYPE
    //
    // - toString allow to make easier the debug of the action
    //

    actionCreator.TYPE = type
    // requried by `isActionType`
    actionCreator.isActionType = true
    actionCreator.toString = () => type

    return actionCreator
  }

  return createActionFunc
}

export default createActionBuilder
