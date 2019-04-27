import { createSelector, getStateForModule } from 'reacticoon/selector'
import { formatMockedCalls } from './format'

const getState = getStateForModule('ReacticoonMockApiPlugin::MockedCallsModule')

export const getMockedCalls = createSelector(
  getState,
  state => {
    const mockedCalls = state.get('mockedCalls', [])
    return formatMockedCalls(mockedCalls.toJS())
  }
)
