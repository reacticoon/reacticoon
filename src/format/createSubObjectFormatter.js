import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import includes from 'lodash/includes'

import invariant from 'invariant'

const createSubObjectFormatter = (path, ...functions) => {
  return (data, props = {}) => {
    if (isNil(data)) {
      return null
    }

    invariant(!includes(path, '.'), `invalid path ${path}, nested paths not handled.`)

    let parentObject = {...data}

    if (isEmpty(functions)) {
      return parentObject
    }

    functions.forEach((func) => {
      invariant(isFunction(func), 'invalid paremeter pass to createSubObjectFormatter')

      if (!isNil(parentObject[path])) {
        // add object to map (parent) on the props
        const funcRes = func(parentObject[path], { ...props, formattedItem: parentObject })
        invariant(!isNil(funcRes), `[formatter] invalid return, data is nil on ${func}`)
        parentObject[path] = funcRes
      }

    })

    return parentObject
  }
}

export default createSubObjectFormatter
