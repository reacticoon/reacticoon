//
// create appOptions `entities` config with registered modules
//
import forOwn from 'lodash/forOwn'
import isNil from 'lodash/isNil'
import invariant from 'invariant'
import { __DEV__ } from '../environment'

const generateModuleEntities = modules => {
  const entities = {}

  forOwn(modules, (module, key) => {
    invariant(!isNil(module.content.reducer), `no reducer found for ${module.name}`)
    const reducer = module.content.reducer
    if (__DEV__) {
      reducer._module = module.name
      reducer.toString = () => `[reducer] ${module.name}`
    }
    entities[module.name] = reducer
  })

  return entities
}

export default generateModuleEntities
