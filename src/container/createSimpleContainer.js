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
 *
 * TODO: implement cancel request action
 * TODO: implement reset data action
 */
function createSimpleContainer(containerName, options) {
  try {
    const Module = options.module

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
        const {
          children,
          mapChildrenProps,
          isPending,
          request,
          data,
          error,
          cancelRequest,
        } = this.props

        let childrenProps = {
          isPending,
          data,
          error,
          request,
          cancelRequest,
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
      const getSelector = Module.getSelector
      return {
        isPending: getSelector('isPending')(state, ownProps),
        data: getSelector('getData')(state, ownProps),
        error: getSelector('getError')(state, ownProps),
        request: getSelector('getRequest')(state, ownProps),
      }
    }

    const apiCallAction = Module.getAction(options.apiCallAction)

    const mapActions = {
      apiCallAction,
      cancelRequest: apiCallAction.cancelRequest,
    }

    return connect(mapStateToProps, mapActions)(SimpleContainer)
  } catch (e) {
    console.error(e)
    debugger
  }
}

export default createSimpleContainer
