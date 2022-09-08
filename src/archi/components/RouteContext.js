import React from 'react'

const RouteContext = React.createContext({
  route: null,
  routeParams: {},
  location: null,
  params: {},
})

export default RouteContext
