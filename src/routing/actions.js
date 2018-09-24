import isString from 'lodash/isString'

import { push, replace, goBack as goBackAction } from 'react-router-redux'

import invariant from 'invariant'
import isNil from 'lodash/isNil'
import pickBy from 'lodash/pickBy'

import { Query } from './constants'

import { formatQueryParams, getQueryFromUri } from './utils'

import { getConfigForRoute, getHistory } from './config'

//
// react-router-redux need a middleware to handle functions such as `push(location)`,
// `replace(loacation)`
// It handle actions creators that correspond with the history methods of the same name.
// see https://github.com/ReactTraining/history/blob/v3/docs/GettingStarted.md#navigation
//
// For reference they are defined as follows:
// push - Pushes a new location to history, becoming the current location.
// replace - Replaces the current location in history.
// go - Moves backwards or forwards a relative number of locations in history.
// goForward - Moves forward one location. Equivalent to go(1)
// goBack - Moves backwards one location. Equivalent to go(-1)
//
// Both push and replace take in a location descriptor, which can be an object describing the URL
// or a plain string URL.
//
// A location object is conceptually similar to document.location in web browsers, with a few
// extra goodies. location objects have the following properties:
//
// pathname      The pathname portion of the URL, without query string
// search        The query string portion of the URL, including the ?
// state         An object of data tied to this location
// action        One of PUSH, REPLACE, or POP
// key           A unique identifier for this location
//
// see https://github.com/ReactTraining/history/blob/v3/docs/Location.md
//
// We do not use Location but our custom `Route` object, that is defined on `RoutingEnum`.
//
//

//
// About `options` property:
// - keepQuery: it will keep all the query params set on the current url and put them back on the
//   new route.
//
//

export const generatePathWithParams = (route, params, query, options = {}) => {
  const config = getConfigForRoute(route)

  invariant(!isNil(config), `Config for route ${route.name} not found`);

  // keep query from url
  let finalQueries = {...query}
  const queryParamsToKeep = !isNil(config.props) ? config.props.query || [] : []
  const currentUrlQueries = getQueryFromUri(window.location.href)

  queryParamsToKeep.forEach((queryParam) => {
    const currentValueOnUrl = currentUrlQueries[queryParam]
    const alreadySet = !isNil(finalQueries[queryParam])
    if (currentValueOnUrl && !alreadySet) {
      finalQueries[queryParam] = currentValueOnUrl
    }
  })

  // remove queries that have the Query.REMOVE_ME value.
  finalQueries = pickBy(finalQueries, value => value !== Query.REMOVE_ME)
  // remove undefined values
  finalQueries = pickBy(finalQueries, value => value !== undefined)

  return route.generatePathWithParams(params, finalQueries, options)
}

export const redirectTo = (route, params, query, options = {}) => {
  if (isString(route)) {
    return push(route)
  }
  const path = generatePathWithParams(route, params, query, options)
  return push(path)
}

export const createRedirectToAction = (route, params, query) => dispatch => (
  dispatch(redirectTo(route, params, query))
)

export const replaceWith = (route, params, query, options = {}) => {
  if (isString(route)) {
    return push(route)
  }
  const path = generatePathWithParams(route, params, query, options)
  return replace(path)
}

export const createReplaceWithAction = (route, params, query) => dispatch => (
  dispatch(replaceWith(route, params, query))
)

export const reloadTo = (route, params, query, options = {}) => {
  if (isString(route)) {
    return push(route)
  }
  const path = generatePathWithParams(route, params, query, options)
  window.location = path
}

export const reloadToPath = path => {
  window.location = path
}

export const openExternalLink = (uri) => {
  window.open(uri, '_blank')
}

export const redirectToExternal = (uri, query = {}) => {
  window.location = formatQueryParams(uri, query)
}

export const updatePageQueries = (query = {}) => {
  const history = getHistory()
  const currentQuery = getQueryFromUri(window.location.href)

  history.push({
    pathname: window.location.pathname,
    query: {
      ...currentQuery,
      ...query,
    }
  })
}

export const goBack = goBackAction
