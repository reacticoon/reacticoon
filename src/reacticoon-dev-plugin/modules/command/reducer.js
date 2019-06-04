import Immutable from 'immutable'

import { createReducer } from 'reacticoon/reducer'

import { runCommand } from './actions'

const INITIAL_STATE = Immutable.fromJS({})

const handleCommandRequest = (state, action) => {
  // uncomment to test circular reference error handling
  // action.request.request = action.request
  // action.next = action
  // const a = Immutable.fromJS(action)

  return state.mergeIn(
    [action.data.command, action.data.id],
    Immutable.fromJS({ isLoading: true, data: null })
  )
}

const handleCommandSuccess = (state, action) =>
  state.mergeIn(
    [action.data.command, action.data.id],
    Immutable.fromJS({
      isLoading: false,
      data: action.response,
    })
  )

const CommandModuleReducer = createReducer(INITIAL_STATE, {
  [runCommand.REQUEST]: handleCommandRequest,
  [runCommand.SUCCESS]: handleCommandSuccess,
})

export default CommandModuleReducer
