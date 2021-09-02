//
// create appOptions `entities` config with registered modules
//
import forOwn from 'lodash/forOwn'
import isUndefined from 'lodash/isUndefined'
import invariant from 'invariant'
import { isDebugLogLevel } from 'reacticoon/environment'

const generateModuleEntities = modules => {
  const entities = {}

  forOwn(modules, (module, key) => {
    // force module to set reducer to null
    // TODO: warn reducer must be explicitely null or noReducer set to true
    if (!(!isUndefined(module.content.reducer) || module.content.noReducer)) {
      debugger
    }
    if (!module.content.noReducer) {
      const reducer = module.content.reducer
      if (reducer) {
        if (isDebugLogLevel()) {
          reducer._module = module.name
          reducer.toString = () => `[reducer] ${module.name}`
        }
        entities[module.name] = reducer
      }
    }
  })

  return entities
}

export default generateModuleEntities
