import Immutable from 'immutable'
import { createReducer } from 'reacticoon/reducer'
import { setUserContext, clearUserContext } from './actions'

const DEFAULT = Immutable.fromJS({
  userContext: null,
})

const onUserContextSet = (state, action) => state.set('userContext', action.payload.userContext)
const onClearUserContext = (state, action) => state.set('userContext', null)

const reducer = createReducer(DEFAULT, {
  [setUserContext]: onUserContextSet,
  [clearUserContext]: onClearUserContext,
})

export default reducer
