import { createSelector } from 'reselect'

//
//
//

const getState = state => state.i18n

export const isFetchingI18nPhrases = createSelector([getState], state => state.get('isFetching'))
