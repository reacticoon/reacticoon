import { createSelector, getStateForModule } from 'reacticoon/selector'

const getState = getStateForModule('ReacticoonDevToolbar')

export const getRoute = createSelector(getState, state => state.get('route', null))
