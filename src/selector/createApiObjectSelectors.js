import isNil from 'lodash/isNil'
import { createSelector } from 'reselect'
import { RequestStatus } from 'reacticoon/api/constants'

/**
 * Generate a simple selector with basic isFetching / getData / getError / getRequest but with a make prefix.
 * @param  {function} getState  Function to retrieve entity from state
 *                              state => state.entities.ENTITY_NAME
 * @param  {function} getPath 
 * @param  {function} formatData  Callback function to format data
 * @return {object}             Object with 3 selectors
 *                              isFetching / getData / getErrors
 
 */
const createApiObjectSelectors = (getState, getPath, formatData = null) => {
  const getProps = (state, props) => props

  return {
    makeIsPending: () =>
      createSelector([getState, getPath], (dataState, path) => {
        if (isNil(dataState)) {
          return false
        }

        const listObject = dataState.getIn(path)

        return isNil(listObject) ? false : listObject.get('isPending') || false
      }),

    makeGetData: () =>
      createSelector([getState, getPath, getProps], (dataState, path, props) => {
        if (isNil(dataState)) {
          return null
        }

        const listObject = dataState.getIn(path)

        if (isNil(listObject)) {
          return null
        }

        const data = listObject.get('data')

        if (isNil(data)) {
          return null
        }

        return formatData !== null && typeof formatData === 'function'
          ? formatData(data, props)
          : data
      }),

    makeGetError: () =>
      createSelector([getState, getPath], (dataState, path) => {
        if (isNil(dataState)) {
          return null
        }

        const listObject = dataState.getIn(path)

        if (isNil(listObject)) {
          return null
        }

        const error = listObject.get('error')

        if (isNil(error)) {
          return null
        }

        return error
      }),

    makeGetRequest: () =>
      createSelector([getState, getPath], (dataState, path) => {
        if (isNil(dataState)) {
          return null
        }

        const listObject = dataState.getIn(path)

        if (isNil(listObject)) {
          return null
        }

        const data = listObject.toJS()

        const status = data?.status || RequestStatus.NOT_LOADED
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

export default createApiObjectSelectors
