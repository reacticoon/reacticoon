import React from 'react'
import ScrollToTop from './ScrollToTop'

const Layout = ({ children, location }) => (
  <div className="u-sizeFullHeight u-relative">
    <ScrollToTop location={location}>{children}</ScrollToTop>
  </div>
)

export default Layout
