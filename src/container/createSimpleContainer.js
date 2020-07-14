import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'reacticoon/view'
import isEqual from 'lodash/isEqual'
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
        const { apiCallAction, apiCallParameters, isPending } = this.props

        // TODO: compare apiCallParameters
        if (!isPending) {
          // TODO: find better way
          if (isArray(apiCallParameters)) {
            apiCallAction.apply(null, apiCallParameters)
          } else {
            apiCallAction(apiCallParameters)
          }
        }
      }

      componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.apiCallParameters, this.props.apiCallParameters)) {
          this.loadData()
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
          // optionnal
          paging,
        } = this.props

        let childrenProps = {
          isPending,
          data,
          error,
          request,
          cancelRequest,
          // optionnal
          paging,
          run: (apiCallParameters) => {
            const { apiCallAction } = this.props
            apiCallAction(apiCallParameters)
          },
          loadMore: () => {
            const { apiCallAction, apiCallParameters, isPending } = this.props
            const page = paging?.next?.page
            const limit = paging?.limit
            // TODO: compare apiCallParameters
            if (!isPending) {
              // TODO: find better way
              if (isArray(apiCallParameters)) {
                const finalApiCallParameters = [...apiCallParameters, page, limit]
                apiCallAction.apply(null, finalApiCallParameters)
              } else {
                const finalApiCallParameters = {
                  page,
                  limit,
                }
                apiCallAction(finalApiCallParameters)
              }
            }
          }
        }

        if (!children) {
          return null
        }

        if (isFunction(mapChildrenProps)) {
          childrenProps = mapChildrenProps(childrenProps)
        }

        return children(childrenProps)
      }
    }

    SimpleContainer.displayName = containerName

    SimpleContainer.propTypes = {
      apiCallParameters: PropTypes.object,
    }

    const mapStateToProps = (state, ownProps) => {
      const getSelector = Module.getSelector
      const getOptionalSelector = Module.getOptionalSelector
      return {
        isPending: options.selectors?.isPending ? options.selectors?.isPending(state, ownProps) :getSelector('isPending')(state, ownProps),
        data: options.selectors?.getData ? options.selectors?.getData(state, ownProps) : getSelector('getData')(state, ownProps),
        error: options.selectors?.getError ? options.selectors?.getError(state, ownProps) :getSelector('getError')(state, ownProps),
        request:options.selectors?.getRequest ? options.selectors?.getRequest(state, ownProps) : getSelector('getRequest')(state, ownProps),
        // optionnal
        paging: options.selectors?.getPaging ? options.selectors?.getPaging(state, ownProps) : getOptionalSelector('getPaging')(state, ownProps),
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
