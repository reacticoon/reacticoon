import { createSelector, getStateForModule } from 'reacticoon/selector';

// create the `getState` function, that will receive the state for the
// given module.
const getState = getStateForModule('ReacticoonDev::CheckupModule');

export const getCheckupData = createSelector([getState], state => {
  const data = state.get('checkup', null)

  return data ? data.toJS() : null
});

export const isFetchingCheckupData = createSelector([getState], state =>
  state.get('isFetching', false)
);