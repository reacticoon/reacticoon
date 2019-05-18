import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'

import invariant from 'invariant'

/**
 * @param  {array|...functions} functionsParams either an array or multiple arguments.
 */
const createFormatter = (...functionsParams) => (data, props = {}) => {
  invariant(isNil(props) || typeof props === 'object', 'format props must be an object')

  if (isNil(data)) {
    return null
  }

  // previously on Reacticoon, we where spreading the data but:
  // - it is not a deep copy while we modify nested data
  // - it takes memory for no gain
  // - we were making this to force our formatter to return the formatted object, in an effort to
  //   make functions clearer and avoid modifying by reference.
  // This makes our mind think that we does not modify the initial data by reference, while it is
  // the case for nested data references.
  // Now, we wants to format our data by reference because:
  // - the data will come from immutable data
  // - we want to modify by reference, to avoid the repetitive `return myObject`
  let formattedObject = data // isArray(data) ? [ ...data ] : { ...data }

  //
  // createFormatter should be used by passing all the functions as arguments, but we also handle an
  // array of methods.
  //
  const functions = isArray(functionsParams[0]) ? functionsParams[0] : functionsParams

  if (isEmpty(functions)) {
    return formattedObject
  }

  functions.forEach((func, index) => {
    invariant(
      isFunction(func),
      `invalid paremeter pass to createFormatter at index ${index}: ${func}`
    )

    const funcRes = func(formattedObject, props)

    // allow formatter to modify data by reference, or return it
    if (!isNil(funcRes)) {
      // invariant(!isNil(funcRes), `[formatter] invalid return, data is nil on ${func}`)
      formattedObject = funcRes
    }
  })

  return formattedObject
}

export default createFormatter
