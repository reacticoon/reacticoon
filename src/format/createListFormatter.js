import isArray from 'lodash/isArray'
import isNil from 'lodash/isNil'
import invariant from 'invariant'

const createListFormatter = (itemFormatter, callback = null) => (list, props) => {
  invariant(isNil(props) || typeof props === 'object', 'format props must be an object')
  if (!isArray(list)) {
    debugger
  }
  invariant(isArray(list), 'list to format is not array')
  // TODO:
  // invariant((callback === null || isFunction(list)), 'callback is not a function')

  // filter to remove nil values from the list.
  const listResult = (list || []).filter(Boolean).map(item => itemFormatter(item, props))

  return callback ? callback(listResult) : listResult
}

export default createListFormatter
