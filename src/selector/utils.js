import invariant from 'invariant'
import isUndefined from 'lodash/isUndefined'
import startsWith from 'lodash/startsWith'
import last from 'lodash/last'

export const isMakeSelector = (selectorName, selector) => {
  // handle selector name like mySelectors.getData
  selectorName = last((selectorName || '').split('.'))

  return (
    // selectors created using createMakeSelector have the __IS_MAKE_SELETOR property.
    (selector && selector.__IS_MAKE_SELECTOR) 
    // using the make prefix for the selector name make it a "make selector"
    || (selectorName && startsWith(selectorName, 'make'))
  )
}

/**
 *
 * @param {} moduleName
 */
export const getStateForModule = moduleName => {
  const entityName = moduleName

  const getModuleState = state => {
    const moduleState = state[entityName]

    invariant(
      !isUndefined(moduleState),
      `[Reacticoon] could not find state for ${moduleName} module.
       Verify that the module name is correct and that the default data is not undefined.
       Also, verify that the module is registered on your config.modules, are dynamically imported via 'useModule'
      `
    )

    return moduleState
  }
  return getModuleState
}
