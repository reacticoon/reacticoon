import { createModule } from 'reacticoon/module'

import * as actions from './actions'
import * as selectors from './selectors'
import reducer from './reducer'
import * as middlewares from './middlewares'

const EventsModule = createModule('ReacticoonDev::EventModule', {
  actions,
  reducer,
  selectors,
  middlewares
})

export default EventsModule
