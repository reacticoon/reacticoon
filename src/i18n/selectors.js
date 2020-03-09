import { createSelector } from 'reselect'

//
//
//

const getState = state => state.i18n

export const isPendingI18nPhrases = createSelector([getState], state => state.get('isPending'))
