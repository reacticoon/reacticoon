import { createSelector, getStateForModule } from 'reacticoon/selector'

const getState = getStateForModule('ReacticoonDev::EventModule')

export const getEvents = createSelector(
  getState,
  state => {
    const res = state.get('events')
    return res.toJS ? res.toJS() : []
  }
)
