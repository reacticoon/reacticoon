import { createModuleContainer } from 'reacticoon/container'
import MockedCallsModule from './'

const container = createModuleContainer(
  'ReacticoonMockApiMockedCallsContainer',
  MockedCallsModule,
  {
    selectors: { mockedCalls: 'getMockedCalls' },
    actions: ['saveMockedCall'],
  }
)

export default container
