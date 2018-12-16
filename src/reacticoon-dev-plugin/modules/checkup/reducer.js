import Immutable from 'immutable'

import { createReducer } from 'reacticoon/reducer'

import { runCheckup } from './actions'

const INITIAL_STATE = Immutable.fromJS({
  checkup: null,
  isLoading: false,
})

const handleCheckupRequest = (state, action) => state.set('isLoading', true)

const handleCheckupSuccess = (state, action) => state.merge({ isLoading: false, checkup: action.response })

const CheckupModuleReducer = createReducer(INITIAL_STATE, {
  [runCheckup.REQUEST]: handleCheckupRequest,
  [runCheckup.SUCCESS]: handleCheckupSuccess,
})

export default CheckupModuleReducer;