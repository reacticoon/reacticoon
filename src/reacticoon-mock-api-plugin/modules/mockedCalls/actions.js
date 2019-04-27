import { createAction } from 'reacticoon/action'

export const saveMockedCall = createAction(
  'ReacticoonMockApiPlugin::MockedCallsModule::saveMockedCall',
  mockedCall => ({
    mockedCall,
  })
)
