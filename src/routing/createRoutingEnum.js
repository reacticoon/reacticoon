import { validateRoute } from './validation'
import { isDebugLogLevel } from 'reacticoon/environment'

/**
 * Creates a Reacticoon RoutingEnum
 *
 * @param {Object} routingEnum
 */
const createRoutingEnum = routingEnum => {
  if (isDebugLogLevel()) {
    // Verify the user routing enum
    Object.keys(routingEnum).forEach(key => {
      const route = routingEnum[key]
      validateRoute(route)
    })
  }

  return {
    // Spread use config routingEnum.
    ...routingEnum,
  }
}

export default createRoutingEnum
