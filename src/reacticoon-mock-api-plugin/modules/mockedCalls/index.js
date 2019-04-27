import { createModule } from 'reacticoon/module'

import * as actions from './actions'
import * as selectors from './selectors'
import reducer from './reducer'

const MockedCallsModule = createModule('ReacticoonMockApiPlugin::MockedCallsModule', {
  actions,
  reducer,
  selectors,
})

export default MockedCallsModule
