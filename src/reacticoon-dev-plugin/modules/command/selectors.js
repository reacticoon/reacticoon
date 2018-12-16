import { createSelector, getStateForModule } from 'reacticoon/selector';

// create the `getState` function, that will receive the state for the
// given module.
const getState = getStateForModule('ReacticoonDev::CommandModule');

export const getCommandData = createSelector([getState], state => {
  const data = state.get('data', null)

  return data ? data.toJS() : null
});

export const isFetchingCommandData = createSelector([getState], state =>
  state.get('isFetching', false)
);