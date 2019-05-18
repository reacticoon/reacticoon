import { getStore } from 'reacticoon/store'
import { saveMockedCall } from './modules/mockedCalls/actions'
import { getMockedCalls } from './modules/mockedCalls/selectors'

class MockDebugger {
  addMockedCall = (request, data) => {
    getStore().dispatch(saveMockedCall({ request, data }))
  }

  getMockedCalls() {
    return getMockedCalls(getStore().getState())
  }
}

export default new MockDebugger()
