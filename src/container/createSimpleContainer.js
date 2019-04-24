import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'reacticoon/view'
import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'

/**
 *
 * @param options
 *  - module
 *  - apiCallAction: string, name of the action to use
 *  - apiCallParameters: Object
 *  - selectors, name of the selectors, result of createApiSelectors
 *  - mapChildrenProps: function(childrenProps)
 */
function createSimpleContainer(containerName, options) {
  class SimpleContainer extends React.Component {
    constructor(props) {
      super(props)

      this.loadData()
    }

    loadData() {
      const { apiCallAction, apiCallParameters } = this.props
      // TODO: find better way
      if (isArray(apiCallParameters)) {
        apiCallAction.apply(null, apiCallParameters)
      } else {
        apiCallAction(apiCallParameters)
      }
    }

    render() {
      const { children, mapChildrenProps, isFetching, data, error } = this.props

      let childrenProps = {
        isFetching: isFetching,
        data: data,
        error: error,
      }

      if (isFunction(mapChildrenProps)) {
        childrenProps = mapChildrenProps(childrenProps)
      }

      return children(childrenProps)
    }
  }

  SimpleContainer.displayName = containerName

  SimpleContainer.propTypes = {
    apiCallParameters: PropTypes.object.isRequired,
  }

  const mapStateToProps = (state, ownProps) => {
    const getSelector = options.module.getSelector
    return {
      isFetching: getSelector('fetchBookSelectors').isFetching(state, ownProps),
      data: getSelector('fetchBookSelectors').getData(state, ownProps),
      error: getSelector('fetchBookSelectors').getError(state, ownProps),
    }
  }

  const mapActions = {
    apiCallAction: options.module.getAction(options.apiCallAction),
  }

  return connect(
    mapStateToProps,
    mapActions
  )(SimpleContainer)
}

export default createSimpleContainer
