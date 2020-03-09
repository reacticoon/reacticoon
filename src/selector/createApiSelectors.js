import invariant from 'invariant'
import isNil from 'lodash/isNil'
import isFunction from 'lodash/isFunction'
import { createSelector } from 'reselect'
import { RequestStatus } from 'reacticoon/api/constants'

import { getStateForModule } from './utils'

/**
 * Generate a simple selector with basic isPending / getData / getError
 *
 * @param  {function|string} stateRetriever  Function to retrieve entity from state
 *                              state => state.ENTITY_NAME
 *                              or a string that defines the module name
 * @param  {function} formatData  Callback function to format data on `getData`
 * @return {object}             Object with 3 selectors
 *                              isPending / getData / getErrors
 *
 * ```javascript
 * const userSelectors = createApiSelectors(state => state.user)
 *
 * export const isPendingUser = userSelectors.isPending
 * export const getUserData = userSelectors.getData
 * export const getUserError = userSelectors.getError
 *
 * ```
 *
 */
const createApiSelectors = (stateRetriever, formatData = null) => {
  invariant(!isNil(stateRetriever), `stateRetriever parameter missing`)

  const getState = isFunction(stateRetriever) ? stateRetriever : getStateForModule(stateRetriever)

  return {
    isPending: createSelector([getState], dataState =>
      isNil(dataState) ? false : dataState.get('isPending') || false
    ),

    getData: createSelector([getState], dataState => {
      if (isNil(dataState)) {
        return null
      }

      const data = dataState.get('data')

      if (isNil(data)) {
        return null
      }

      return formatData !== null && typeof formatData === 'function'
        ? formatData(data.toJS())
        : data.toJS()
    }),

    getError: createSelector([getState], dataState => {
      if (isNil(dataState)) {
        return null
      }

      const error = dataState.get('error')

      if (isNil(error)) {
        return null
      }

      return error.toJS()
    }),

    getMeta: createSelector([getState], dataState => {
      if (isNil(dataState)) {
        return null
      }

      const meta = dataState.get('meta')

      if (isNil(meta)) {
        return null
      }

      return meta.toJS()
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

export default createApiSelectors
