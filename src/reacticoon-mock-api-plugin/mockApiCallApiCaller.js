import { formatEndpoint } from 'reacticoon/api/utils'
import MockDebugger from './MockDebugger'

/**
 * Custom Api caller that can mock response.
 * It will search for a json file representing the result of the request. The json file must be on the
 * /test/api-mocks directory. The file must be placed as the endpoint of the api call:  /users/2 requires a file on /test/api-mocks/users/2
 *
 * Only handles GET for now.
 *
 * returns true if we should fallback on the default api caller
 */
const mockApiCallApiCaller = request => {
  if (request.type !== 'GET') {
    return true
  }

  // try to find a mock json file
  // TODO: find a better way. Maybe we should make the build server listing the possible mocks
  try {
    const endpoint = formatEndpoint(request.endpoint, request.params)
    const fileContent = require(`app/../test/api-mocks${endpoint}.json`)
    MockDebugger.addMockedCall(request, fileContent)
    request.success(fileContent)
    return false
  } catch (e) {
    // ignore, there is no mock file
  }

  return true
}

export default mockApiCallApiCaller
