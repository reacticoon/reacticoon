import { createModuleContainer } from 'reacticoon/container'
import UserContextModule from './'

const container = createModuleContainer('ReacticoonDevUserContextContainer', UserContextModule, {
  selectors: { userContext: 'getUserContext' },
  actions: [],
})

export default container
