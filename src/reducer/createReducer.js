import Immutable from 'immutable'
import invariant from 'invariant'

import { __DEV__ } from 'reacticoon/environment'

/*
 * create a reducer.
 * 
 * @param initialState
 * @param fnMap: object with:
 *      - key: the action type
 *      - value: function (state, action)
 * 
 */
const createReducer = (initialState, fnMap) => {

  const reducer = (state = Immutable.fromJS(initialState), action) => {
    const handler = fnMap[action.type]

    const newState = handler ? handler(state, action) : state
    invariant(newState !== undefined, `reducer returned undefined.`)
    return newState
  }

  if (__DEV__) {
    reducer.__fnMap = fnMap
  }

  return reducer
}

export default createReducer
