import { EventManager } from 'reacticoon/event'
import { isDebugLogLevel } from 'reacticoon/environment'
import isArray from 'lodash/isArray'
import isNull from 'lodash/isNull'
import memoize from 'lodash/memoize'
import invariant from 'invariant'
import { isTraceLogLevel } from 'reacticoon/environment'

//
// modules are saved on an object where the key is the module name. Allow direct access
//
const _modules = {}

// TODO: remove TRICK
let _configured = false

let _registerModulesCalled = false
// contains modules to be registered using registerModule, but called before registerModules is called.
// we need to register them once registerModules is called for the first time.
const modulesToRegister = []

export const isConfigured = () => _configured

export const registerModule = module => {
  if (!_registerModulesCalled) {
    modulesToRegister.push(module)
    return true;
  }

  const key = module.name
  if (!_modules[key]) {
    _modules[key] = module

    // add subModules
    const subModulesToRegister = []
    module.getSubModules().forEach(subModule => {
      if (!_modules[module.name]) {
        _modules[module.name] = subModule
        subModulesToRegister.push(subModule)
      }
    })

    EventManager.dispatch(EventManager.Event.REGISTER_MODULES, {
      newModules: [module, ...subModulesToRegister],
      modules: { ..._modules },
    })
    if (isDebugLogLevel()) {
      console.trace(`[Reacticoon][registerModule] ${key}`)

      console.log('[Reacticoon][module] registered modules')
      console.table(_modules)
    }
    return true
  } else if (isTraceLogLevel()) {
    console.log(`[Reacticoon][registerModule] already registered ${key}`)
  }
  return false
}

export const registerModules = modulesParam => {
  let modules = [ ...modulesParam ]
  if (!_registerModulesCalled) {
    modules = [ ...modulesParam, ...modulesToRegister]
  }
  _registerModulesCalled = true
  const newModules = []
  if (process.env.__DEV__) {
    console.groupCollapsed('[Reacticoon][module] registerModules')
    console.table(modules.map(mod => ({
      name: mod.name
    })))
    console.groupEnd()
  }
  modules.forEach(module => {
    if (!_modules[module.name]) {
      _modules[module.name] = module
      newModules.push(module)
    }
  })

  EventManager.dispatch(EventManager.Event.REGISTER_MODULES, {
    newModules,
    modules: { ..._modules },
  })

  _configured = true

  if (isDebugLogLevel()) {
    console.log('[Reacticoon][module] registered modules')
    console.table(_modules)
  }
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
    : isArray(moduleNamesParam)
    ? moduleNamesParam
    : [moduleNamesParam]

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
