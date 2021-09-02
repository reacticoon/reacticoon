import { registerModule } from './config'
import { isDebugLogLevel } from 'reacticoon/environment'

/**
 * Allows to dynamically import a module.
 */
function useModule(rModule) {
  if (isDebugLogLevel()) {
    // invariant does not works well here.
    if (!rModule || !rModule.__IS_MODULE) {
      console.error(`[Reacticoon][useModule] invalid module given to useModule`)
    }
  }
  try {
    registerModule(rModule)

    if (isDebugLogLevel()) {
      console.trace(`[Reacticoon][useModule] ${rModule.name}`)
    }
  } catch (err) {
    // TODO: event
    console.error(err)
    debugger
  }
}

export default useModule
