import { createSelector, getStateForModule } from 'reacticoon/selector'

const getState = getStateForModule('ReacticoonDev::EventModule')

export const getEvents = createSelector(
  getState,
  state => state.get('events')
)
