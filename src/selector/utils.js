// import invariant from 'invariant'
import startsWith from 'lodash/startsWith'
import last from 'lodash/last'
// import { getModulesMap, getModules } from 'reacticoon/module'

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

    // this fails for lazy loaded modules when their state hasn't been inititate yet.
    // if (!getModulesMap[moduleName]) {
    //   console.trace(`[Reacticoon] could not find state for ${moduleName} module.`)
    //   console.table(getModules())
    //   invariant(
    //     false,
    //     `[Reacticoon] could not find state for ${moduleName} module.
    //     Verify that the module name is correct and that the default data is not undefined.
    //     Also, verify that the module is registered on your config.modules, are dynamically imported via 'useModule'
    //     `
    //   )
    // }

    return moduleState
  }
  return getModuleState
}
