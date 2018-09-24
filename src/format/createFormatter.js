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

  // copy object
  let res = isArray(res) ? [ ...res ] : { ...data }

  // 
  // The rest parameters order is not keep (inversed), so we handle and array as first argument,
  // but keep legacy where we pass functions as arguments.
  // 
  const functions = isArray(functionsParams[0]) ? functionsParams[0] : functionsParams

  if (isEmpty(functions)) {
    return res
  }

  functions.forEach(func => {
    invariant(isFunction(func), 'invalid paremeter pass to createFormatter')

    const funcRes = func(res, props)

    invariant(!isNil(funcRes), `[formatter] invalid return, data is nil on ${func}`)

    res = funcRes
  })

  return res
}

export default createFormatter
