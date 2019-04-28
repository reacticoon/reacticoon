import { createModule } from 'reacticoon/module'

import * as actions from './actions'
import * as selectors from './selectors'
import reducer from './reducer'

const UserContextModule = createModule('ReacticoonDev::UserContextModule', {
  actions,
  reducer,
  selectors,
})

export default UserContextModule
