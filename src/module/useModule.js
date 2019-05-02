import { __DEV__ } from 'reacticoon/environment'
import { registerModule } from './config'

/**
 * Allows to dynamically import a module.
 */
function useModule(rModule) {
  if (__DEV__) {
    // invariant does not works well here.
    if (!rModule || !rModule.__IS_MODULE) {
      console.error(`invalid module given to useModule`)
    }
  }
  try {
    registerModule(rModule)

    if (__DEV__) {
      console.info(`useModule ${rModule.name}`)
    }
  } catch (err) {
    // TODO: event
    console.error(err)
    debugger
  }
}

export default useModule
