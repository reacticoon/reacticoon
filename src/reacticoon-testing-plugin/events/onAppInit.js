import { ReacticoonEvents, createEventHandler } from 'reacticoon/event'
import { __DEV__ } from 'reacticoon/environment'
import { getRoute } from 'reacticoon/routing'
import RoutingDebugger from '../../reacticoon-dev-plugin/RoutingDebugger'

const onAppInit = createEventHandler(ReacticoonEvents.ON_APP_INIT, () => {
  if (__DEV__) {
    // TODO: move on end-to-end plugin
    // test adding Reacticoon
    window.ReacticoonTesting = {
      test: () => 42,
      getRoute,
      getCurrentRoute: RoutingDebugger.getCurrentRoute,
    }
  }
})

export default onAppInit
