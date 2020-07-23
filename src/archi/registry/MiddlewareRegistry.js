import forEach from 'lodash/forEach'
import generateMiddlewareMap from 'reacticoon/middleware/appMiddleware/generateMiddlewareMap'

export class MiddlewareRegistry {
  constructor() {
    this._middlewares = {}
  }

  getMiddlewares() {
    return this._middlewares
  }

  register(appMiddlewares) {
    const middlewareMap = generateMiddlewareMap(appMiddlewares)
    forEach(middlewareMap, (middlewares, middlewareName) => {
      this._middlewares[middlewareName] = [
        ...(this._middlewares[middlewareName] || []),
        ...middlewares,
      ]
    })
  }

  addMiddlewares(middlewares) {
    const middlewareMap = generateMiddlewareMap(middlewares)
    forEach(middlewareMap, (middlewares, middlewareName) => {
      this._middlewares[middlewareName] = [
        ...(this._middlewares[middlewareName] || []),
        ...middlewares,
      ]
    })
  }
}

const middlewareRegistry = new MiddlewareRegistry()
export default middlewareRegistry
