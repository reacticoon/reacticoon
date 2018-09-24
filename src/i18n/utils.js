import Polyglot from 'node-polyglot'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'

// import manually the language files we need
// TODO: do this dynamically
import 'moment/locale/fr'

import { getQueryParam } from '../routing/utils'

import { retrieveMessages } from './actions'

export const getDefaultLocale = (): string => {
  // Define user's language. Different browsers have the user locale defined
  // on different fields on the `navigator` object, so we make sure to account
  // for these different by checking all of them
  const language =
    (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage

  return language
}

//
//
//

const DEFAULT_OPTIONS = {
  defaultLocale: getDefaultLocale(),
  calendar: false,
}

let _locale = null

//
// - calendar: boolean -> tr flatpickr ?
//
let _options = null

// create an instance of the Polyglot class, which you will use for translation.
// Polyglot is class-based so you can maintain different sets of phrases at the same time, possibly
// in different locales. This is very useful for example when serving requests with Express,
// because each request may have a different locale, and you don’t want concurrent requests to
// clobber each other’s phrases.
let _polyglot = new Polyglot({ locale: getDefaultLocale() })

export const getPolyglot = () => _polyglot

export const setPolyflot = polyglot => {
  _polyglot = polyglot
}

//
//
//

const getLanguageWithoutRegionCode = (language: string): string => {
  if (isEmpty(language)) {
    return 'en'
  }

  // Split locales with a region code
  const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0]

  return languageWithoutRegionCode
}

export const getCurrentLanguageWithoutRegionCode = (): string => {
  return getLanguageWithoutRegionCode(_locale)
}

export const isSupportedLocale = locale =>
  find(_options.locales, supportedLocale => supportedLocale.toLowerCase() === locale.toLowerCase())

//
//
//

export const configureI18n = (options = {}) => {
  // set options
  _options = { ...DEFAULT_OPTIONS, ...options }

  if (_options.disable) {
    return
  }

  if (!global.Intl) {
    console.error('Required intl Polyfill')
  }

  const locale = getQueryParam('l')
  if (!isEmpty(locale) && isSupportedLocale(locale)) {
    _options.defaultLocale = locale
  }

  setLocale(_options.defaultLocale)
}

export const setLocale = locale => {
  _locale = locale

  let language = getLanguageWithoutRegionCode(locale)
  if (!isSupportedLocale(language)) {
    language = getDefaultLocale()
  }

  moment.locale(language)

  // TODO: add appConfig callback to allow user to configure i18n on third party libraries
  // (ex: flatpickr)

  // retrieve messages
  retrieveMessages(language)
}

export const getLocale = () => _locale

//
//
//

const trWithLocale = (locale: string, key: string, options: Object = {}): string => {
  if (isEmpty(key)) {
    // TODO: in dev, error
    return ''
  }

  try {
    const message = getPolyglot().t(key, options)

    return message
  } catch (e) {
    console.error(e)
    // console.warn(`I18n: ${key} error when formatting for locale ${locale}`, options)
  }

  return locale
}

export const tr = (key: string, options: Object = {}): string => {
  return trWithLocale(_locale, key, options)
}
