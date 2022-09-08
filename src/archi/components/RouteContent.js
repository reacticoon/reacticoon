import React from 'react'
import ScrollToTop from './ScrollToTop'

import { getLayoutViews } from 'reacticoon/plugin/config'
import RouteContext from './RouteContext'

const RouteContent = ({ children, location, params, routeParams, route }) => (
  <div className="u-sizeFullHeight u-relative">
    <RouteContext.Provider
      value={{
        route,
        routeParams,
        location,
        params,
      }}
    >
      <ScrollToTop location={location}>{children}</ScrollToTop>

      {/* add layout views. Layout views are plugin-defined views to add here. Plugins can
    configure using a `layoutViews` array.*/}
      {getLayoutViews().map((view, index) =>
        React.createElement(view, {
          key: index,
          location,
          params,
          routeParams,
          route,
        })
      )}
    </RouteContext.Provider>
  </div>
)

export default RouteContent
