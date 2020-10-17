import React from 'react'
import PropTypes from 'prop-types'

import isNil from 'lodash/isNil'
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'

import { connect } from 'reacticoon/view'
import { useModule } from 'reacticoon/module'

/**
 *
 * @param options
 *  - module
 *  - apiCallAction: string, name of the action to use
 *  - apiCallParameters: Object
 *  - selectors, name of the selectors, result of createApiSelectors
 *  - mapChildrenProps: function(childrenProps)
 *  - forceReload: change the default forceReload prop.
 *  - context
 *
 * TODO: implement cancel request action
 * TODO: implement reset data action
 */
function createSimpleContainer(containerName, options) {
  try {
    const Module = options.module

    useModule(Module)

    class SimpleContainer extends React.Component {
      constructor(props) {
        super(props)

        if (props.forceReload || !props.data) {
          this.loadData()
        }
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
          resetRequestData,
          // optionnal
          paging,
        } = this.props

        let childrenProps = {
          isPending,
          data,
          error,
          request,
          cancelRequest,
          resetRequestData,
          // optionnal
          paging,
          run: (apiCallParametersParams) => {
            const { apiCallAction, apiCallParameters } = this.props
            apiCallAction(apiCallParametersParams || apiCallParameters)
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
                  ...apiCallParameters,
                  page,
                  limit,
                }
                apiCallAction(finalApiCallParameters)
              }
            }
          }
        }

        if (!children) {
          if (options.context) {
            return <options.context.Provider value={data} />
          } 
          return null 
        }

        if (isFunction(mapChildrenProps)) {
          childrenProps = mapChildrenProps(childrenProps)
        }

        if (options.context) {
          return <options.context.Provider value={data}>
              {children(childrenProps)}
            </options.context.Provider> 
        } 

        return children(childrenProps)
      }
    }

    SimpleContainer.displayName = containerName

    SimpleContainer.defaultProps = {
      forceReload: !isNil(options?.forceReload) ? options.forceReload : true
    }

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
      resetRequestData: apiCallAction.resetRequestData,
    }

    return connect(mapStateToProps, mapActions)(SimpleContainer)
  } catch (e) {
    console.error(e)
    debugger
  }
}

export default createSimpleContainer
