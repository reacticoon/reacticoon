import createApiEnumAction from '../api/utils/createApiEnumAction'

import { getStore } from '../store'

export const I18nFetchingLocale = createApiEnumAction('Reacticoon::I18n::FETCHING_LOCALE')

const onFailure = language => {
  getStore().dispatch({
    type: I18nFetchingLocale.FAILURE,
    locale: language,
  })
}

export const retrieveMessages = language => {
  const url = `${process.env.PUBLIC_URL}/i18n/${language}.json`

  getStore().dispatch({
    type: I18nFetchingLocale.REQUEST,
    locale: language,
  })

  fetch(url, {
    method: 'get',
  })
    .then(response => {
      response.text().then(text => {
        if (response.ok) {
          try {
            getStore().dispatch({
              type: I18nFetchingLocale.SUCCESS,
              locale: language,
              phrases: JSON.parse(text),
            })
          } catch (e) {
            // handle exception when could not parse the text.
            // Can be caused because the translation file does not exists but the server does not
            // return a failure code.
            onFailure(language)
          }
        } else {
          onFailure(language)
        }
      })
    })
    .catch(err => {
      getStore().dispatch({
        type: I18nFetchingLocale.FAILURE,
        locale: language,
      })
    })
}
