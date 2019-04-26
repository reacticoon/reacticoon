import { formatEndpoint } from 'reacticoon/api/utils'

/**
 * Custom Api caller that can mock response.
 * It will search for a json file representing the result of the request. The json file must be on the
 * /test/api-mocks directory. The file must be placed as the endpoint of the api call:  /users/2 requires a file on /test/api-mocks/users/2
 *
 * Only handles GET for now.
 */
const mockApiCallApiCaller = request => {
  if (request.type !== 'GET') {
    return true
  }

  let shouldUseDefault = true
  // try to find a mock json file
  // TODO: find a better way. Maybe we should make the build server listing the possible mocks
  try {
    const endpoint = formatEndpoint(request.endpoint, request.params)
    const fileContent = require(`app/../test/api-mocks${endpoint}.json`)
    request.success(fileContent)
  } catch (e) {
    // ignore, there is no mock file
  }

  return shouldUseDefault
}

export default mockApiCallApiCaller
