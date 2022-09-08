import isNil from 'lodash/isNil'
import cloneDeep from 'lodash/cloneDeep'
import isFunction from 'lodash/isFunction'
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

  const getDataInPath = () => createSelector([getState, getPath], (state, path) => {
    if (isNil(state)) {
      return null
    }

    const listObject = state.getIn(path)
    if (isNil(listObject)) {
      return null
    }

    return { listObject, path }
  })

  const makeGetDataForCommand = () => createSelector([getDataInPath()], commandData => {
    if (!commandData) {
      return null
    }
    const { listObject, path } = commandData
    return listObject
  })
  
  return {
    makeIsPending: () => createSelector([makeGetDataForCommand()], data => {
        if (isNil(data)) {
          return false
        }

        return data.get('isPending') ?? false
      }),

    makeGetData: () => createSelector([makeGetDataForCommand(), getProps], (data, props) => {
        if (isNil(data)) {
          return null
        }

        const objectData = cloneDeep(data.get('data'))

        return isFunction(formatData)
          ? formatData(objectData, props)
          : cloneDeep(objectData)
      }),

    makeGetError: () => createSelector([makeGetDataForCommand()], data => {
        if (isNil(data)) {
          return null
        }

        return data.get('error')
      }),

    makeGetRequest: () => createSelector([makeGetDataForCommand()], data => {
        if (isNil(data)) {
          return null
        }

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
