import React from 'react'
import PropTypes from 'prop-types'

import isNil from 'lodash/isNil'

import { Link as ReactRouterLink } from 'react-router'

import Route from './Route'
import { getRoutingEnum, getRoute } from './config'

/**
 * Abstract the react-router-dom Route to handle our `Route` definition.
 */
const Link = props => {
  const { to, params, children, ...otherProps } = props
  const finalTo = !isNil(to)
    ? to.generatePathWithParams(params)
    : '#'

  return (
    <ReactRouterLink to={finalTo} {...otherProps}>
      {children}
    </ReactRouterLink>
  )
}

Link.propTypes = {
  to: PropTypes.objectOf(Route).isRequired,
}

// Shortcut to access to RoutingEnum
Link.getEnum = getRoutingEnum

// Shortcut to retrieve a route config (to use in the `to` prop)
Link.getRoute = getRoute

export default Link
