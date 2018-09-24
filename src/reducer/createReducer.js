import Immutable from 'immutable'
import invariant from 'invariant'

/*
 * create a reducer.
 * 
 * @param initialState
 * @param fnMap: object with:
 *      - key: the action type
 *      - value: function (state, action)
 * 
 */
const createReducer = (initialState, fnMap) => (state = Immutable.fromJS(initialState), action) => {
  const handler = fnMap[action.type]

  const newState = handler ? handler(state, action) : state
  invariant(newState !== undefined, `reducer returned undefined.`)
  return newState
}

export default createReducer
