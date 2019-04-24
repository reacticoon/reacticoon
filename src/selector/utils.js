import invariant from 'invariant'
import isUndefined from 'lodash/isUndefined'

/**
 *
 * @param {} moduleName
 */
export const getStateForModule = moduleName => {
  const entityName = moduleName

  const getModuleState = state => {
    const moduleState = state.entities[entityName]

    invariant(
      !isUndefined(moduleState),
      `[Reacticoon] could not find state for ${moduleName} module.
       Verify that the module name is correct and that the default data is not undefined.
      `
    )

    return moduleState
  }
  return getModuleState
}
