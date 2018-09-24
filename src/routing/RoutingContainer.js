import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  redirectTo,
  replaceWith,
  reloadTo,
  goBack,
  openExternalLink,
  redirectToExternal,
  updatePageQueries,
} from '../../actions.js'

import { getRoutingEnum } from './config'

/**
 * Gives the shortcut to routing module such as:
 * - actions
 * - RoutingEnum
 */
class RoutingContainer extends React.Component {
  render() {
    const {
      redirectTo,
      replaceWith,
      reloadTo,
      goBack,
      openExternalLink,
      redirectToExternal,
      updatePageQueries,
      children,
    } = this.props

    return children({
      redirectTo,
      replaceWith,
      goBack,
      reloadTo,
      openExternalLink,
      redirectToExternal,
      updatePageQueries,
      RoutingEnum: getRoutingEnum(),
    })
  }
}

RoutingContainer.propTypes = {
  // children MUST be a function
  children: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => {
  // no state to map yet
  return {}
}

export default connect(mapStateToProps, {
  redirectTo,
  replaceWith,
  reloadTo,
  goBack,
  openExternalLink,
  redirectToExternal,
  updatePageQueries,
})(RoutingContainer)
