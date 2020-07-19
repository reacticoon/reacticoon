import isNil from 'lodash/isNil'
import { createSelector } from 'reselect'
import invariant from 'invariant'
import isFunction from 'lodash/isFunction'
import { getStateForModule } from './utils'
import { RequestStatus } from 'reacticoon/api/constants'

/**
 * Generate a simple selector with basic isFetching / getData / getErrors
 * @param  {function} getState  Function to retrieve entity from state
 *                              state => state.entities.ENTITY_NAME
 * @param  {function|object} formatData  Callback function to format data or object { formatter: , props:}
 * @return {object}             Object with 3 selectors
 *                              isFetching / getData / getErrors
 */
const createApiPaginateSelectors = (stateRetriever, formatData = null) => {
  const getState = isFunction(stateRetriever) ? stateRetriever : getStateForModule(stateRetriever)

  return {
    isPending: createSelector(
      [getState],
      dataState => (isNil(dataState) ? false : dataState.get('isFetching') || false)
    ),

    getData: createSelector([getState], state => {
      if (isNil(state)) {
        return null
      }

      const data = state.get('data')

      if (isNil(data)) {
        return null
      }

      if (formatData !== null) {
        if (typeof formatData === 'function') {
          // TODO:
          return formatData(!data.toJS ? data : data.toJS())
        } else {
          invariant(
            isFunction(formatData.formatter),
            `formatData object must contains the formatter`
          )
          return formatData.formatter(data.toJS(), formatData.props)
        }
      }
      return data.toJS()
    }),

    getPaging: createSelector([getState], state => {
      if (isNil(state)) {
        return null
      }

      const paging = state.get('paging')

      if (isNil(paging)) {
        return null
      }

      // TODO: fix
      return paging.toJS ? paging.toJS() : paging
    }),

    getError: createSelector([getState], dataState => {
      if (isNil(dataState)) {
        return null
      }

      const error = dataState.get('error')

      if (isNil(error)) {
        return null
      }

      // TODO:
      return error.toJS ? error.toJS() : error
    }),

    getRequest: createSelector([getState], dataState => {
      if (isNil(dataState)) {
        return null
      }

      const data = dataState.toJS()

      const status = data.status || RequestStatus.NOT_LOADED
      const isPending = status === RequestStatus.PENDING
      const hasFailed = status === RequestStatus.FAILED
      const hasLoaded = status === RequestStatus.LOADED

      return {
        isPending,
        hasFailed,
        hasLoaded,
        status,
      }
    }),
  
  }
}

export default createApiPaginateSelectors
