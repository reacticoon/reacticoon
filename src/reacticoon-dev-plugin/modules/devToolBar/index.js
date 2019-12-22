import { createModule } from 'reacticoon/module'

import * as actions from './actions'
import * as selectors from './selectors'
import reducer from './reducer'

export * from './constants'

const ReacticoonDevToolbarModule = createModule('ReacticoonDevToolbar', {
  actions,
  reducer,
  selectors,
})

export default ReacticoonDevToolbarModule
