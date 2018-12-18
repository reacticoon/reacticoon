import Immutable from 'immutable'

import { createReducer } from 'reacticoon/reducer'

import { runCommand } from './actions'

const INITIAL_STATE = Immutable.fromJS({
  data: null,
  isLoading: false,
})

const handleCommandRequest = (state, action) => state.merge({ isLoading: true, data: null })

const handleCommandSuccess = (state, action) => state.merge({ isLoading: false, data: action.response })

const CommandModuleReducer = createReducer(INITIAL_STATE, {
  [runCommand.REQUEST]: handleCommandRequest,
  [runCommand.SUCCESS]: handleCommandSuccess,
})

export default CommandModuleReducer;