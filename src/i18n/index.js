import Polyglot from 'node-polyglot'
import Immutable from 'immutable'

import { I18nFetchingLocale } from './actions'
import { RETRIEVE_MESSAGES_LIMIT } from './constants'

import { setPolyflot, getDefaultLocale } from './utils'

import { retrieveMessages } from './actions'

export * from './selectors'
export * from './utils'

//
//
//

const DEFAULT = Immutable.fromJS({
  isFetching: false,
  locale: null,
  phrases: {},
  retrieveCount: 0,
})

export const i18nReducer = (state = DEFAULT, action) => {
  switch (action.type) {
    case I18nFetchingLocale.REQUEST:
      return state.merge({
        isFetching: true,
      })

    case I18nFetchingLocale.SUCCESS:
      const { locale, phrases } = action

      // instance Polyglot for this locale
      const polyglot = new Polyglot({
        locale,
      })

      // add our strings
      polyglot.extend({
        ...phrases,
      })

      setPolyflot(polyglot)

      console.info(`[i18n] lodaded for ${locale}`)

      return state.merge({
        isFetching: false,
        locale,
        phrases,
        retrieveCount: 0,
      })

    case I18nFetchingLocale.FAILURE:
      const retrieveCount = state.retrieveCount + 1

      if (retrieveCount < RETRIEVE_MESSAGES_LIMIT) {
        retrieveMessages(getDefaultLocale())
      }

      return state.merge({
        isFetching: false,
        locale,
        phrases,
        retrieveCount,
      })

    default:
      return state
  }
}
