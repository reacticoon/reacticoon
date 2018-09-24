import invariant from 'invariant'

import forIn from 'lodash/forIn'
import isEmpty from 'lodash/isEmpty'

/**
 * Define a route.
 */
export default class Route {

  // The name (identifier) of the route.
  name: string

  // The path of the route. Ex: /home or /users/:id
  path: string

  disable: boolean

  authRequired: boolean

  /**
   * Construct a new Route object.
   * @param name The name (identifier) of the route.
   * @param path The path of the route. Ex: /home or /restaurants/:id
   * @param handler The handler for this route. A null handler disable the route
   * @param handler Define if the route is restrict to loggedIn user
   * @param disable
   */
  constructor(name: string, path: string, authRequired: boolean = true,
    disable: boolean = false) {
    invariant((path.indexOf(' ') === -1), `invalid path ${path} for route ${name}`)
    invariant((name.indexOf(' ') === -1), `invalid name ${name}`)

    this.name = name
    this.path = path
    this.authRequired = authRequired
    this.disable = disable
  }

  formatQueryParams(parameters: Object): string {
    let qs = ''
    for (let key in parameters) {
      let value = parameters[key];
      qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
    }
    if (qs.length > 0) {
      qs = qs.substring(0, qs.length - 1); // chop off last '&'
      return `?${qs}`
    }

    return ''
  }


  parseQueryToObject(query) {
    query = (query).replace(/\+/g, '%20')

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
  generatePathWithParams(params: Object, query: Object, options = {}) {
    const search = window.location.search.substring(1)

    if (!isEmpty(search) && options.keepQuery === true) {
      query = { ...query, ...this.parseQueryToObject(document.location.search.substring(1)) }
    }

    let path = this.path;
    forIn(params, (param, key) => {
      path = path.replace(`:${key}`, param)
    })

    return path + this.formatQueryParams(query)
  }

  getPath(): string {
    return this.path
  }
}
