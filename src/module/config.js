import isArray from 'lodash/isArray'
import isNull from 'lodash/isNull'
import memoize from 'lodash/memoize'
import invariant from 'invariant'

//
// modules are saved on an object where the key is the module name. Allow direct access
//
const _modules = {}

// TODO: remove TRICK
let _configured = false

export const isConfigured = () => _configured

export const registerModule = (key, module) => {
  _modules[key] = module
}

export const registerModules = modules => {
  modules.forEach(module => {
    _modules[module.name] = module
  })
  _configured = true
}

export const getModules = () => _modules

export const getModulesForNames = moduleNames => {
  const modules = []

  moduleNames.forEach(moduleName => {
    const module = getModule(moduleName)
    if (module) {
      modules.push(module)
    }
  })

  return modules
}

export const getModule = key => {
  const unit = _modules[key] || null
  if (_configured) {
    invariant(!isNull(unit), `Module ${key} is not registered`)
  }
  return unit
}

export const getModulesMap = memoize(moduleNames => {
  const modules = {}
  moduleNames.forEach(moduleName => {
    const mod = getModule(moduleName)
    modules[moduleName] = mod
  })
  return modules
})

/**
 * Each module given to the view is formatted as a flat object, containing:
 * - actions
 * - selectors
 * - constants
 */
export const getModulesMapForView = memoize(moduleNamesParam => {
  const moduleNames = isNull(moduleNamesParam)
    ? []
    : isArray(moduleNamesParam) ? moduleNamesParam : [moduleNamesParam]

  const modules = getModulesForNames(moduleNames)
  const modulesMapForView = {}

  modules.forEach(module => {
    modulesMapForView[module.name] = {
      ...(module.content.actions || {}),
      ...(module.content.selectors || {}),
      ...(module.content.constants || {}),
    }
  })

  return modulesMapForView
})
