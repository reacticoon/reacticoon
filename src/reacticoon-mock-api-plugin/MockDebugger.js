import { formatMockedCalls } from './format'

class MockDebugger {
  constructor() {
    this.mockedCalls = []
  }

  addMockedCall = (request, data) => {
    this.mockedCalls.push({ request, data })
  }

  getMockedCalls() {
    return this.mockedCalls
  }

  getFormattedMockedCalls() {
    return formatMockedCalls(this.mockedCalls)
  }
}

export default new MockDebugger()
