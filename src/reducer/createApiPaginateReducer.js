import Immutable from 'immutable'
import invariant from 'invariant'
import isFunction from 'lodash/isFunction'
import isObject from 'lodash/isObject'
import isUndefined from 'lodash/isUndefined'
import concat from 'lodash/concat'
import uniqWith from 'lodash/uniqWith'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'

/**
 * Generate a simple reducer with basic REQUEST / SUCCESS / FAILURE
 * @param  {string} actionType  Action to be reduced
 * @return {Immutable}          Updated state
 */

const DEFAULT_STATE = Immutable.fromJS({
  data: null,
  pagination: null,
  isFetching: false,
  error: null,
})

/**
 * @param options
 *  - onShouldReset. By default when the cursor 'before' is null, we reset the data, since it is the
 *    first page. On certains cases, we do not want to reset the data, even if our pagination has
 *    changed. This method should return false in this case. It receives the Api action reponse.
 */
const createApiPaginateReducer = (
  actionType,
  reducer = null,
  options = {
    isTypeCursor: false,
    isTypePage: true,
  }
) => {
  
  const paginateReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case actionType.REQUEST:
        return state.merge({
          isFetching: true,
          error: null,
        })

      case actionType.SUCCESS:
        let newList = []

        /**
         * A null before cursor means we ran the action to load the first
         * data page. In this case, we don't merge the data,
         * we reset it.
         */

        let isFirstPage = false
        switch (true) {
          case options.isTypeCursor === true:
            isFirstPage =
              isEmpty(action.response?.paging?.cursors?.before) &&
              (!options.onShouldReset || options.onShouldReset(action) === true)
            break

          case options.isTypePage === true:
            isFirstPage =
              action.response?.paging?.page === 0 &&
              (!options.onShouldReset || options.onShouldReset(action) === true)
            break

          default:
        }

        if (isFirstPage) {
          newList = action.response.data
        } else {
          let currentList = state.getIn(['data'])
          if (!isNil(currentList)) {
            currentList = currentList
              .valueSeq()
              .toArray()
              .map(item => {
                return item.toJS()
              })
          } else {
            currentList = []
          }

          newList = concat(currentList, action.response.data)
          // TODO: provide option that gives a callback instead of comparing id
          newList = uniqWith(newList, (a, b) => a.id === b.id)
        }

        return state.merge({
          isFetching: false,
          lastUpdated: new Date(),
          error: null,
          data: Immutable.fromJS(newList),
          paging: action.response.paging,
        })

      case actionType.FAILURE:
        return state.merge({
          data: null,
          isFetching: false,
          error: action.error,
        })

      default:
        if (reducer !== null) {
          invariant(
            isFunction(reducer) || isObject(reducer),
            'reducer must be a function or an object'
          )
          let res
          if (isFunction(reducer)) {
            res = reducer(state, action)
          } else {
            const func = reducer[action.type]
            if (!func) {
              // no reducer function found for the action type.
              return state
            }
            res = func(state, action)
          }
          invariant(!isUndefined(res), 'reducer returned undefined')
          return res
        }
        return state
    }
  }

  paginateReducer.isPaginateReducer = true

  return paginateReducer
}

createApiPaginateReducer.DEFAULT_STATE = DEFAULT_STATE

export default createApiPaginateReducer
