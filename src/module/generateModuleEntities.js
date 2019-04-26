//
// create appOptions `entities` config with registered modules
//
import forOwn from 'lodash/forOwn'
import isUndefined from 'lodash/isUndefined'
import invariant from 'invariant'
import { __DEV__ } from '../environment'

const generateModuleEntities = modules => {
  const entities = {}

  forOwn(modules, (module, key) => {
    // force module to set reducer to null
    invariant(!isUndefined(module.content.reducer), `no reducer found for ${module.name}`)
    const reducer = module.content.reducer
    if (reducer) {
      if (__DEV__) {
        reducer._module = module.name
        reducer.toString = () => `[reducer] ${module.name}`
      }
      entities[module.name] = reducer
    }
  })

  return entities
}

export default generateModuleEntities
