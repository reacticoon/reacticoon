import invariant from 'invariant'

import forIn from 'lodash/forIn'
import isEmpty from 'lodash/isEmpty'

/**
 * Define a route.
 */
export default class RouteDefinition {
  /**
   * Construct a new RouteDefinition object.
   * @param name The name (identifier) of the route.
   * @param path The path of the route. Ex: /home or /restaurants/:id
   * @param handler The handler for this route. A null handler disable the route
   * @param handler Define if the route is restrict to loggedIn user
   * @param disable
   */
  constructor(name, path, authRequired = false, disabled = false) {
    invariant(path.indexOf(' ') === -1, `invalid path ${path} for route ${name}`)
    invariant(name.indexOf(' ') === -1, `invalid name ${name}`)

    this.name = name
    this.path = path
    this.authRequired = authRequired
    this.disabled = disabled
  }

  formatQueryParams(parameters) {
    let qs = ''
    for (let key in parameters) {
      let value = parameters[key]
      qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&'
    }
    if (qs.length > 0) {
      qs = qs.substring(0, qs.length - 1) // chop off last '&'
      return `?${qs}`
    }

    return ''
  }

  parseQueryToObject(query) {
    if (!query) {
      return {}
    }
    query = query.replace(/\+/g, '%20')

    let arr = {}
    let a = query.split(/&(?!amp)/g)

    for (let i = 0; i < a.length; i++) {
      const pair = a[i].split('=')
      arr[pair[0]] = decodeURIComponent(a[i].substr(a[i].indexOf('=') + 1))
    }

    return arr
  }

  /*
   * Replace params. On url definition, params start with ':'
   */
  generatePathWithParams(params, query, options = {}) {
    const search = window.location.search.substring(1)

    if (!isEmpty(search) && options.keepQuery === true) {
      query = { ...query, ...this.parseQueryToObject(document.location.search.substring(1)) }
    }

    let path = this.path
    forIn(params, (param, key) => {
      path = path.replace(`:${key}`, param)
    })

    return path + this.formatQueryParams(query)
  }

  getPath() {
    return this.path
  }
}
