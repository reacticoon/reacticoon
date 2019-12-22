import Immutable from 'immutable'
import cloneDeep from 'lodash/cloneDeep'
import { createReducer } from 'reacticoon/reducer'
import { displayDevToolbarRoute } from './actions'

const DEFAULT = Immutable.fromJS({
  route: null,
})

const displayDevToolbarRouteReducer = (state, action) =>
  state.setIn(['route'], action.payload.route)

const reducer = createReducer(DEFAULT, {
  [displayDevToolbarRoute]: displayDevToolbarRouteReducer,
})

export default reducer
