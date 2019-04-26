import { ReacticoonEvents, createEventHandler } from 'reacticoon/event'
import { __DEV__ } from 'reacticoon/environment'

import { registerCustomApiCaller } from 'reacticoon/api/config'

const onAppInit = createEventHandler(ReacticoonEvents.ON_APP_INIT, () => {
  if (__DEV__) {
    const mockApiCallApiCaller = require('../mockApiCallApiCaller').default
    registerCustomApiCaller(mockApiCallApiCaller)
  }
})

export default onAppInit
