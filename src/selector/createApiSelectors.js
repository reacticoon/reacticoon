import invariant from 'invariant'
import isNil from 'lodash/isNil'
import isFunction from 'lodash/isFunction'
import { createSelector } from 'reselect'

import { getStateForModule } from './index'

/**
 * Generate a simple selector with basic isFetching / getData / getError
 *
 * @param  {function|string} stateRetriever  Function to retrieve entity from state
 *                              state => state.entities.ENTITY_NAME
 *                              or a string that defines the module name
 * @param  {function} formatData  Callback function to format data on `getData`
 * @return {object}             Object with 3 selectors
 *                              isFetching / getData / getErrors
 *
 * ```javascript
 * const userSelectors = createApiSelectors(state => state.entities.user)
 *
 * export const isFetchingUser = userSelectors.isFetching
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
    isFetching: createSelector(
      [getState],
      dataState => (isNil(dataState) ? false : dataState.get('isFetching') || false)
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
  }
}

export default createApiSelectors
