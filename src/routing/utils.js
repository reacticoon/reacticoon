import isNil from 'lodash/isNil'
import isArray from 'lodash/isArray'

const asArray = (param) => (
  isArray(param)
    ? param
    : [ param ]
)

/**
 * Parse the given `uri` and returns its query params as an object.
 * @param  {string} uri
 */
export const getQueryFromUri = (uri) => {
  uri = uri.replace(/%3D/gi, '=').replace(/%3F/i, '?')

  if (uri.indexOf('?') === -1)  {
    return {}
  }

  // Checking if there is at least one parameter
  const uriBase = uri.substr(uri.indexOf('?') + 1)
  if (uriBase === '') {
    return {}
  }

  return uriBase.split('&').reduce((prev, curr, i, arr) => {
    var p = curr.split("=")
    prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1])
    return prev
  }, {})
}

/**
 * Append the given `parameters` to the `uri`
 * if the `uri` already contains query parameters
 */
export const formatQueryParams = (uri, parameters: Object): string => {
  if (isNil(uri)) {
    return null
  }

  // get query on uri
  const uriParameters = getQueryFromUri(uri)

  // merge query from uri and parameters
  parameters = {
    ...uriParameters,
    ...parameters,
  }

  // remove query
  uri = uri.split('?')[0]

  let qs = ''
  for (let key in parameters) {
    let value = parameters[key]
    qs += key + '=' + value + '&'
  }

  if (qs.length > 0) {
    qs = encodeURI(qs)
    qs = qs.substring(0, qs.length - 1) // chop off last '&'

    if (uri.indexOf('?') === -1) { // does not have a query param yet
      return `${uri}?${qs}`
    }

    return `${uri}&${qs}`
  }

  return uri
}


/**
* see https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
*/
export const getQueryParam = (name, url) => {
  if (!url) url = window.location.href
  name = name.replace(/[[\]]/g, '\\$&')

  const regex = new RegExp("[?&]" + name + '(=([^&#]*)|&|#|$)'),
  results = regex.exec(url);
  if (!results) {
    return null
  }
  if (!results[2]) {
    return ''
  }

  const component = decodeURIComponent(results[2].replace(/\+/g, ' '))

  if (component) {
    // remove hash '#'
    // ex: tableNumber=1#entrees must return 1 for `tableNumber` name
    const hashIndex = component.lastIndexOf('#')
    if (hashIndex !== -1) {
      return component.substr(0, hashIndex)
    }
  }

  return component
}

export const getHash = (url) => {
  if (!url) {
    return window.location.hash
  }

  const component = decodeURIComponent(url.replace(/\+/g, ' '))

  const hashIndex = component.lastIndexOf('#')
  if (hashIndex !== -1) {
    return component.substr(hashIndex + 1)
  }

  return null
}

export const getCallbackUri = (callbackUri, event) => (
  `${callbackUri}?event=${event}`
)

export const removeUrlParameter = (url, queryToRemoveParam) => {
  const queryToRemove = asArray(queryToRemoveParam)

  // let finalUrl = decodeURI(url)

  let queries = getQueryFromUri(url)

  const baseUrl = url
  .replace(/%3F/i, '?')
  .split('?')[0]

  queryToRemove.forEach(query => {
    // finalUrl = removeQueryParamFromUrl(finalUrl, query)
    delete queries[query]
  })

  return formatQueryParams(baseUrl, queries)
}
