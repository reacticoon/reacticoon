import React from 'react'
import PropTypes from 'prop-types'

import isNil from 'lodash/isNil'
import isString from 'lodash/isString'

import { Link as ReactRouterLink } from 'react-router-dom'

import RouteDefinition from './RouteDefinition'
import { getRoutingEnum, getRoute } from './config'

/**
 * Abstract the react-router-dom RouteDefinition to handle our `RouteDefinition` definition.
 */
const Link = props => {
  const { to, params, query, children, newTab, target, href, ...otherProps } = props

  if (href) {
    // TODO: handle query?
    return (
      <a href={href} target={newTab ? '_blank' : target} {...otherProps}>
        {children}
      </a>
    )
  }

  const finalTo = !isNil(to)
    ? isString(to)
      ? getRoute(to).generatePathWithParams(params, query)
      : to.generatePathWithParams(params, query)
    : '#'

  return (
    <ReactRouterLink to={finalTo} target={newTab ? '_blank' : target} {...otherProps}>
      {children}
    </ReactRouterLink>
  )
}

Link.propTypes = {
  to: PropTypes.oneOfType([PropTypes.instanceOf(RouteDefinition), PropTypes.string]),
}

// Shortcut to access to RoutingEnum
// TODO: rename getRoutinEnum?
Link.getEnum = getRoutingEnum

// Shortcut to retrieve a route config (to use in the `to` prop)
Link.getRoute = getRoute

export default Link
