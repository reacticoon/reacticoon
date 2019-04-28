import { createSelector, getStateForModule } from 'reacticoon/selector'

const getState = getStateForModule('ReacticoonDev::UserContextModule')

export const getUserContext = createSelector(
  getState,
  state => {
    const userContext = state.get('userContext', null)
    return userContext ? userContext : null
  }
)
