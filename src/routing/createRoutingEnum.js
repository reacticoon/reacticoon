import Route from './Route'
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
    //
    // Add default Reacticoon routes
    //

    // generic 404 page
    // https://stackoverflow.com/questions/32128978/react-router-no-not-found-route
    PAGE_NOT_FOUND: new Route('PAGE_NOT_FOUND', '*'),

    // Spread use config routingEnum.

    ...routingEnum,
  }
}

export default createRoutingEnum
