//
// create appOptions `entities` config with registered modules
//
import forOwn from 'lodash/forOwn'
import isUndefined from 'lodash/isUndefined'
import invariant from 'invariant'

const generateModuleEntities = modules => {
  const entities = {}

  forOwn(modules, (module, key) => {
    // force module to set reducer to null
    invariant(
      !isUndefined(module.content.reducer) || module.content.noReducer,
      `no reducer found for ${module.name}`
    )
    if (!module.content.noReducer) {
      const reducer = module.content.reducer
      if (reducer) {
        if (FEATURE_REACTICOON_HEAVY_DEBUG) {
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
