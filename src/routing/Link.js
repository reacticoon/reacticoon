import React from 'react'
import PropTypes from 'prop-types'

import isNil from 'lodash/isNil'

import { Link as ReactRouterLink } from 'react-router-dom'

import RouteDefinition from './RouteDefinition'
import { getRoutingEnum, getRoute } from './config'

/**
 * Abstract the react-router-dom RouteDefinition to handle our `RouteDefinition` definition.
 */
const Link = props => {
  const { to, params, children, newTab, target, ...otherProps } = props
  const finalTo = !isNil(to) ? to.generatePathWithParams(params) : '#'

  return (
    <ReactRouterLink to={finalTo} target={newTab ? '_blank' : target} {...otherProps}>
      {children}
    </ReactRouterLink>
  )
}

Link.propTypes = {
  to: PropTypes.objectOf(RouteDefinition).isRequired,
}

// Shortcut to access to RoutingEnum
// TODO: rename getRoutinEnum?
Link.getEnum = getRoutingEnum

// Shortcut to retrieve a route config (to use in the `to` prop)
Link.getRoute = getRoute

export default Link
