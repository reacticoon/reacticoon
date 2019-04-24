import React from 'react'
import ScrollToTop from './ScrollToTop'

// TODO: do not import, should be added via config
import DevToolbar from 'reacticoon/reacticoon-dev-plugin/views/DevToolbar'

const Layout = ({ children, location, params, routes }) => (
  <div className="u-sizeFullHeight u-relative">
    <ScrollToTop location={location}>{children}</ScrollToTop>

    <DevToolbar location={location} params={params} routes={routes} />
  </div>
)

export default Layout
