import RouteDefinition from './RouteDefinition'

//
// Contains the routing enum for reacticoon.
// It allows plugins to interract with those generic pages, and provides default routing ennum.
//
const ReacticoonRoutingEnum = {
  // generic 404 page
  // https://stackoverflow.com/questions/32128978/react-router-no-not-found-route
  PAGE_NOT_FOUND: new RouteDefinition({ name: 'PAGE_NOT_FOUND', path: '*' }),
}

export default ReacticoonRoutingEnum
