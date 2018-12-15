import { __DEV__ } from '../environment/getters'
import { validateRoute } from './validation'

/**
 * Creates a Reacticoon RoutingEnum
 *
 * @param {Object} routingEnum
 */
const createRoutingEnum = routingEnum => {

  if (__DEV__) {
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
