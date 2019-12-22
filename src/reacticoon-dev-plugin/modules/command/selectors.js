import { createSelector, getStateForModule } from 'reacticoon/selector'

// create the `getState` function, that will receive the state for the
// given module.
const getState = getStateForModule('ReacticoonDev::CommandModule')
const getPath = (state, props) => [props.command, props.id]

export const makeGetCommandData = () =>
  createSelector([getState, getPath], (state, path) => {
    const data = state.getIn([...path, 'data'], null)

    try {
      return data ? (data.toJS ? data.toJS() : data) : null
    } catch (e) {
      debugger
    }
  })

export const makeIsFetchingCommandData = () =>
  createSelector([getState, getPath], (state, path) => state.getIn([...path, 'isFetching'], false))

export const makeGetCommandError = () =>
  createSelector([getState, getPath], (state, path) => {
    const data = state.getIn([...path, 'error'], null)

    try {
      return data ? (data.toJS ? data.toJS() : data) : null
    } catch (e) {
      debugger
    }
  })
