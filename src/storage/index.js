import isNil from 'lodash/isNil'
import isNull from 'lodash/isNull'
import isNaN from 'lodash/isNaN'
import isUndefined from 'lodash/isUndefined'

import { isLocalhost } from 'reacticoon/environment'

//
// ------------------------------------------------------------------------------------------------
//        STORAGE
// ------------------------------------------------------------------------------------------------
//

//
// local storage abstraction functions
//

const getObjectFromStorage = (key: string, defaultValue: ?Object = null): ?any => {
  if (!localStorage) {
    return null
  }
  const obj: ?string = localStorage.getItem(key)

  let value: ?any = null

  // default value
  if (isUndefined(obj) || isNull(obj)) {
    if (!isUndefined(defaultValue) && !isNull(defaultValue)) {
      value = defaultValue
    }
  } else {
    try {
      value = JSON.parse(obj)
    } catch (e) {
      value = obj
    }
  }

  // saved values as null are set as a string 'null', not null
  if (value === 'null') {
    return null
  }

  return value
}

//
// setters
//

export const saveToStorage = (key, object) => {
  const json = JSON.stringify(object)
  localStorage.setItem(key, json)
}

//
// getters
//

export const getFromStorage = (key: string, defaultValue: ?any = null) => {
  const value = getObjectFromStorage(key, defaultValue)
  return value
}

export const getFloatFromStorage = (key: string, defaultReturn: number = 0): number => {
  let value = getObjectFromStorage(key)

  // default value
  if (isNil(value) || isNaN(value)) {
    if (!isUndefined(defaultReturn) && !isNull(defaultReturn)) {
      value = defaultReturn
    } else {
      value = 0
    }
  }

  const intValue = parseFloat(value)
  if (isNaN(intValue)) {
    return defaultReturn
  }
  return intValue
}

export const getIntFromStorage = (key: string, defaultReturn: number = 0): number => {
  let value = localStorage.getItem(key)

  // default value
  if (isUndefined(value) || isNull(value) || isNaN(value)) {
    if (!isUndefined(defaultReturn) && !isNull(defaultReturn)) {
      value = defaultReturn
    } else {
      value = 0
    }
  }

  const intValue = parseInt(value, 10)
  if (isNaN(intValue)) {
    return defaultReturn
  }
  return intValue
}

//
// remove
//

export const removeFromStorage = key => {
  localStorage.removeItem(key)
}

//
// ------------------------------------------------------------------------------------------------
//        SESSION
// ------------------------------------------------------------------------------------------------
//

//
// session storage abstraction functions
//

const getObjectFromSession = (key: string, defaultValue: ?Object = null): ?any => {
  if (!sessionStorage) {
    return null
  }
  const obj: ?string = sessionStorage.getItem(key)

  let value: ?any = null

  // default value
  if (isUndefined(obj) || isNull(obj)) {
    if (!isUndefined(defaultValue) && !isNull(defaultValue)) {
      value = defaultValue
    }
  } else {
    try {
      value = JSON.parse(obj)
    } catch (e) {
      value = obj
    }
  }

  // saved values as null are set as a string 'null', not null
  if (value === 'null') {
    return null
  }

  return value
}

//
// setters
//

export const saveToSession = (key, object) => {
  const json = JSON.stringify(object)
  sessionStorage.setItem(key, json)
}

//
// getters
//

export const getFromSession = (key: string, defaultValue: ?any = null) => {
  const value = getObjectFromSession(key, defaultValue)
  return value
}

export const getFloatFromSession = (key: string, defaultReturn: number = 0): number => {
  let value = getObjectFromStorage(key)

  // default value
  if (isNil(value) || isNaN(value)) {
    if (!isUndefined(defaultReturn) && !isNull(defaultReturn)) {
      value = defaultReturn
    } else {
      value = 0
    }
  }

  const intValue = parseFloat(value)
  if (isNaN(intValue)) {
    return defaultReturn
  }
  return intValue
}

export const getIntFromSession = (key: string, defaultReturn: number = 0): number => {
  let value = sessionStorage.getItem(key)

  // default value
  if (isUndefined(value) || isNull(value) || isNaN(value)) {
    if (!isUndefined(defaultReturn) && !isNull(defaultReturn)) {
      value = defaultReturn
    } else {
      value = 0
    }
  }

  const intValue = parseInt(value, 10)
  if (isNaN(intValue)) {
    return defaultReturn
  }
  return intValue
}

//
// remove
//

export const removeFromSession = key => {
  sessionStorage.removeItem(key)
}

//
// ------------------------------------------------------------------------------------------------
//        COOKIES
// ------------------------------------------------------------------------------------------------
//

/**
 * Set Cookie
 * Cookies are saved in name-value pairs like: key = value
 *
 * @param {string} key
 * @param {string} value
 * @param {number} [expTime=86400000] expiration time when cookie will expire (default: 1 day)
 * @param {string} [domain=null] tell the browser what domain the cookie belongs to
 * @param {string} [path='/'] tell the browser what path the cookie belongs to
 */
export const setCookie = (key, value, expTime = 86400000, domain = null, path = '/') => {
  const d = new Date()
  d.setTime(d.getTime() + expTime)
  const expires = d.toUTCString()

  /**
   * domains must start with a dot, so we remove it for localhost
   * https://www.ietf.org/rfc/rfc2109.txt
   */
  if (isNull(domain)) {
    const hostname = window.location.hostname
    domain = hostname.substring(hostname.lastIndexOf('.', hostname.lastIndexOf('.') - 1) + 1)
    domain = `.${domain}`
  }

  document.cookie = `${key}=${value}; expires=${expires};${
    !isLocalhost() ? ` domain=${domain};` : ''
  } path=${path}`
}

/**
 * Get cookie value by key
 *
 * @param {string} key
 * @returns
 */
export const getCookie = key => {
  const name = `${key}=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]

    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }

  return null
}

/**
 * Delete cookie
 *
 * @param {string} key
 * @param {string} [domain=null] tell the browser what domain the cookie belongs to
 * @param {string} [path='/'] tell the browser what path the cookie belongs to
 */
export const deleteCookie = (key, domain = null, path = '/') => {
  /**
   * domains must start with a dot, so we remove it for localhost
   * https://www.ietf.org/rfc/rfc2109.txt
   */
  if (isNull(domain)) {
    const hostname = window.location.hostname
    domain = hostname.substring(hostname.lastIndexOf('.', hostname.lastIndexOf('.') - 1) + 1)
    domain = `.${domain}`
  }

  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ${
    !isLocalhost() ? ` domain=${domain};` : ''
  } path=${path};`
}
