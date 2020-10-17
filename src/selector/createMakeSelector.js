import { createSelector } from 'reselect'

import invariant from 'invariant'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import startsWith from 'lodash/startsWith'
import { defineFunctionName } from 'reacticoon/utils'

// TODO: unit test
const createPropGetter = (propPath, defaultValue) => (_state, props) =>
  props && get(props, propPath, defaultValue)

// TODO: unit test
const getSelectorNameWithMake = name => {
  return `make${name.charAt(0).toUpperCase()}${name.slice(1)}`
}

const createMakeSelector = (
  selectorName,
  selectorsParam = [],
  propsParam = [],
  selector,
  debugMode = false
) => () => {
  invariant(!isEmpty(selectorName), `createMakeSelector: Missing selector name`)
  invariant(
    !startsWith(selectorName, 'make'),
    `Make selector name must not start with 'make' ${name}`
  )
  invariant(!isEmpty(selectorsParam), `createMakeSelector: Missing props params`)
  invariant(!isNil(selector), `createMakeSelector: Missing selector param`)

  // generate props selectors. Prop selector can be in multiple forms:
  // - a function: prop => prop.myVar
  // - a string path: 'myVar'
  // - an array: [ 'myVar', 'default value' ]
  // - an object: [ path: 'myVar', defaultValue: 'default value' ]
  const propsSelectors = (isFunction(propsParam) ? [ propsParam ] : propsParam).map(propParam => {
    if (isString(propParam)) {
      return createPropGetter(propParam, null)
    }

    if (isFunction(propParam)) {
      return propParam
    }

    if (isArray(propParam)) {
      invariant(
        propParam.length === 2,
        `Invalid prop param as array. Must follow [ path, defaultValue ]`
      )

      // handle:
      // ["path", getPath]
      if (isFunction(propParam[1])) {
        return propParam[1]
      }

      // handle: 
      // ["path", "myPath"]
      return createPropGetter(propParam[0], propParam[1])
    }

    if (isObject(propParam) && propParam.path && propParam.defaultValue) {
      return createPropGetter(propParam.path, propParam.defaultValue)
    }

    invariant(false, `Invalid prop param: ${propParam}`)
  })

  const propsSelector = createSelector(propsSelectors, (...props) => {
    return props
  })

  const finalSelectors = [propsSelector, ...selectorsParam]

  selector.__FROM_CREATE_MAKE_SELECTOR = true
  selector.__IS_SELECTOR = true
  selector.__NAME = selectorName
  defineFunctionName(selector, selectorName)

  const makeSelector = createSelector(finalSelectors, (props, ...data) => {
    const selectorResult = selector.apply(null, [ ...data, ...props ])

    if (debugMode) {
      const groupName = `[make selector] ${selectorName} called with arguments:`
      console.group(groupName)
      console.log(data)
      console.info({ selectorResult })
      console.groupEnd(groupName)
    }
    return selectorResult
  })

  makeSelector.__IS_MAKE_SELECTOR = true
  makeSelector.__NAME = getSelectorNameWithMake(selectorName)
  defineFunctionName(makeSelector, makeSelector.__NAME)

  return makeSelector
}

export default createMakeSelector
