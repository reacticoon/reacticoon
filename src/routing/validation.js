import invariant from 'invariant'
import isEmpty from 'lodash/isEmpty'

/**
 * Validate a RouteDefinition object.
 */
export const validateRoute = route => {
  const { name, path } = route

  invariant(!isEmpty(name), `Missing name for route ${path}`)
  invariant(!isEmpty(path), `Missing name for route ${name}`)

  // from RouteDefinition constructor
  invariant(path.indexOf(' ') === -1, `invalid path ${path} for route ${name}`)
  invariant(name.indexOf(' ') === -1, `invalid name ${name}`)
}
