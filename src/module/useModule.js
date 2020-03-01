import { registerModule } from './config'

/**
 * Allows to dynamically import a module.
 */
function useModule(rModule) {
  if (FEATURE_REACTICOON_HEAVY_DEBUG) {
    // invariant does not works well here.
    if (!rModule || !rModule.__IS_MODULE) {
      console.error(`invalid module given to useModule`)
    }
  }
  try {
    registerModule(rModule)

    if (FEATURE_REACTICOON_HEAVY_DEBUG) {
      console.info(`useModule ${rModule.name}`)
    }
  } catch (err) {
    // TODO: event
    console.error(err)
    debugger
  }
}

export default useModule
