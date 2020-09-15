// TODO: handle chaining api calls / multiple api calls
// TODO: refactor, use fetch
// in dev we can log requests with:
// fetch = (originalFetch => {
//   return (...arguments) => {
//     const result = originalFetch.apply(this, arguments);
//       return result.then(console.log('Request was sent'));
//   };
// })(fetch);


import merge from 'lodash/merge'
import isUndefined from 'lodash/isUndefined'
import isNull from 'lodash/isNull'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'

import { tr } from '../i18n'
import { EventManager } from '../event'
import { formatEndpoint } from './utils'

import request from 'superagent'

const Error = {
  NO_INTERNET: 'NO_INTERNET',
  UNKNOWN: 'UNKNOWN',
}

function ApiError(code, message) {
  return {
    code,
    message,
  }
}

class ApiManager {
  ContentTypes = {
    FORM_URL_ENCODE: 'application/x-www-form-urlencoded',
  }

  /**
   * The default ApiManager configuration.
   * @type {Object}
   */
  config = {
    /**
     * A middleware used in case of error.
     * Must return true if the middleware have taking care of the error.
     * Use to handle 401, 500, etc.
     *
     * @param error
     * @param res If undefined, the request have encounter a connexion error.
     * @type Function
     *
     * Example of middleware:
     *
     * ```
     * errorMiddleware: (error, res, success, failure) => {
     * if (!isNil(res)) {
     *       if (res.statusCode === 401) {
     *         console.error('[API] 401, redirect to login')
     *         return true
     *       }
     *
     *       if (res.statusCode === 500) {
     *         console.log(res)
     *         // redirect to error 500 page
     *         return true
     *       }
     *     }
     *     return false
     *   }
     * ```
     */
    errorMiddleware: (error, res, success, failure) => {
      return false
    },

    /**
     * Function that must return an object.
     *
     * Example:
     * {
     *  Authorization:  'toto',
     *  OtherHeader: 'toto42'
     * }
     *
     * Note that the headers set to the request's params have the priority over the headers given
     * by the middleware.
     *
     * @type Function
     */
    headersMiddleware: () => {
      return {}
    },

    /**
     * @type string
     */
    apiUrl: '',
  }

  configure(configuration) {
    this.config = merge(this.config, configuration)
  }

  //
  // ------------- Tools
  //

  getApiUrl(defaultUrl, endpoint) {
    if (!isEmpty(defaultUrl)) {
      return `${defaultUrl}${endpoint}`
    }

    return `${this.config.apiUrl}${endpoint}`
  }

  /**
   * Merge headersParam with the headers given by the headersMiddleware.
   * Priority is given to the params headers over the middleware headers.
   */
  getHeaders(headersParam = {}) {
    if (this.config.headersMiddleware) {
      const headersToSet = merge(this.config.headersMiddleware(), headersParam)

      return headersToSet
    }

    return headersParam
  }

  /**
   * Handle an HTTP response.
   * Calls the success callback in case of success
   * Calls the failure callback in case of error and if the errorMiddleware does not handle the error.
   *
   * @param error
   * @param res
   * @param success the closure called on success. Take a json object as parameter.
   * @param failure the closure called on failure. Take an ApiError as parameter.
   */
  handleResponse(error, res, success, failure) {
    if (!isUndefined(res) && this.isSuccessResponse(res.statusCode)) {
      if (!isEmpty(res.text)) {
        try {
          success(JSON.parse(res.text))
        } catch (e) {
          success(res.text)
        }
      } else {
        success()
      }
    } else {
      const errorMiddlewareUsed = this.config.errorMiddleware(error, res, success, failure)

      if (!errorMiddlewareUsed) {
        if (isUndefined(res)) {
          // no internet connexion / no response
          const apiError = ApiError(
            Error.NO_INTERNET,
            // TODO: localized + allow project to override
            `Une erreur est survenue. Veuillez recharger la page.`
          )
          apiError.localizedMessage = tr('api_error.no_internet')
          failure(apiError)
        } else {
          failure(this.createApiError(res.text))
        }
      }
    }
  }

  /**
   * Parse the HTTP response body to create an ApiError object.
   * @param responseBody The HTTP response body.
   * @returns {ApiError} A populate ApiError object.
   */
  createApiError(responseBody) {
    let error = { code: Error.UNKNOWN, message: 'Something went wrong, please try again' }

    if (!isNull(responseBody) && !isUndefined(responseBody)) {
      try {
        const json = JSON.parse(responseBody)

        if (json) {
          if (!isNil(json.code) || !isNil(json.errorCode)) {
            error = {
              // TODO: remove this after refactor
              code: json.errorCode || json.code,
              message: json.errorMessage || json.message,
              ...json,
            }
          }
        }
      } catch (syntaxError) {
        // SyntaxError exception
        error.detail = responseBody
      }
    }

    return error
  }

  /**
   *
   * @param statusCode the response status code
   * @returns {boolean} True if the status code indicate a successful response
   */
  isSuccessResponse(statusCode) {
    return statusCode >= 200 && statusCode < 300
  }

  //
  // ------------- Requests tools for the API
  //

  /**
   * @param  {Object} request An object that represent a request:
   * {
   *  type: PUT, POST, UPDATE, DELETE, GET
   *  success: success callback (param: JSON)
   *  failure: failure callback (param)
   *  endpoint: the endpoint,
   *  params: the url parameters to set on the endpoint,
   *  query: the url query params,
   *  data|body: the body data to be send as json,
   *  headers: an object of headers,
   * }
   */
  run(request) {
    console.info('apiCall', request)

    // TODO: doc response to give response (fixture)
    if (request.response) {
      this.handleResponse(
        null,
         { statusCode: 200, text: request.response },
        (json) => {
          request.success(json)
        },
        (apiError) => {
          request.failure(apiError)
        }
      )
      return
    }
    switch (request.type) {
      case 'GET':
        this.get(request)
        break
      case 'POST':
        this.post(request)
        break
      case 'UPDATE':
      case 'PUT':
        this.put(request)
        break
      case 'DELETE':
        this.delete(request)
        break
      default:
        EventManager(EventManager.Event.LOG_ERROR, {
          type: 'api',
          detail: `unknown type ${request.type}`,
        })
    }
  }

  /**
   * Create an HTTP GET request.
   * @param endpoint The API endpoint (see ApiEndpoints).
   * @param query The query use on the url.
   * @param success the closure called on success. Take a json object as parameter.
   * @param failure the closure called on failure. Take an ApiError as parameter.
   */
  get(options) {
    const { url, endpoint, params, query, headers, success, failure } = options

    request
      .get(this.getApiUrl(url, formatEndpoint(endpoint, params)), null, null)
      .query(query)
      .set('Accept', 'application/json')
      .set(this.getHeaders(headers))
      .end((error, res) => {
        this.handleResponse(
          error,
          res,
          (json) => {
            success(json)
          },
          (apiError) => {
            failure(apiError)
          }
        )
      })
  }

  /**
   * Create an HTTP GET request.
   * @param endpoint The API endpoint (see ApiEndpoints).
   * @param query The query use on the url.
   * @param success the closure called on success. Take a json object as parameter.
   * @param failure the closure called on failure. Take an ApiError as parameter.
   */
  delete(options) {
    const { url, endpoint, params, query, headers, success, failure } = options

    request
      .delete(this.getApiUrl(url, formatEndpoint(endpoint, params)), null)
      .query(query)
      .set('Accept', 'application/json')
      .set(this.getHeaders(headers))
      .end((error, res) => {
        this.handleResponse(
          error,
          res,
          (json) => {
            success(json)
          },
          (apiError) => {
            failure(apiError)
          }
        )
      })
  }

  post(options) {
    const { url, endpoint, params, data, body = {}, headers, query = {}, success, failure } = options

    // TODO: move on project
    if (endpoint.endsWith('/commands')) {
      query.command = body.command
    }

    request
      .post(this.getApiUrl(url, formatEndpoint(endpoint, params)), null, null)
      .type('json')
      .query(query)
      // we handle body and data
      .send(JSON.stringify(body ? body : data))
      .set('Accept', 'application/json')
      .set(this.getHeaders(headers))
      .end((error, res) => {
        this.handleResponse(
          error,
          res,
          (json) => {
            success(json)
          },
          (apiError) => {
            failure(apiError)
          }
        )
      })
  }

  /**
   * Send a multipart form
   *
   * @param endpoint
   * @param data: example: { otherParameters: JSON.stringify(entity) }
   * @param files: example: { imageCover: // png file here // }
   * @param success
   * @param failure
   */
  postMultipart(options) {
    const { url, endpoint, params, data, files, headers, query, success, failure } = options

    const req = request
      .post(this.getApiUrl(url, formatEndpoint(endpoint, params)), null, null)
      .query(query)

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        req.field(key, data[key])
      }
    }

    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        console.log('put multipart, attach file', key)
        req.attach(key, files[key])
      }
    }

    req
      .set('Accept', 'application/json')
      .set(this.getHeaders(headers))
      .end((error, res) => {
        this.handleResponse(
          error,
          res,
          (json) => {
            success(json)
          },
          (apiError) => {
            failure(apiError)
          }
        )
      })
  }

  /**
   * Create an HTTP PUT request.
   * Note this function will use the 'json' (application/json) format instead of the 'form' format
   * (application/x-www-form-urlencoded)
   *
   * See: https://visionmedia.github.io/superagent/#post-/-put-requests
   *
   * @param endpoint The API endpoint (see ApiEndpoints).
   * @param data The data to send.
   * @param success the closure called on success. Take a json object as parameter.
   * @param failure the closure called on failure. Take an ApiError as parameter.
   */
  put(options) {
    const { url, endpoint, params, data, headers, query, success, failure } = options

    request
      .put(this.getApiUrl(url, formatEndpoint(endpoint, params)), null, null)
      .type('json')
      .send(JSON.stringify(data))
      .query(query)
      .set('Accept', 'application/json')
      .set(this.getHeaders(headers))
      .end((error, res) => {
        this.handleResponse(
          error,
          res,
          (json) => {
            success(json)
          },
          (apiError) => {
            failure(apiError)
          }
        )
      })
  }

  /**
   * Send a multipart form
   *
   * @param endpoint
   * @param data: example: { otherParameters: JSON.stringify(entity) }
   * @param files: example: { imageCover: // png file here // }
   * @param success
   * @param failure
   */
  putMultipart(options) {
    const { url, endpoint, params, data, files, headers, query, success, failure } = options

    const req = request
      .put(this.getApiUrl(url, formatEndpoint(endpoint, params)), null, null)
      .query(query)

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        req.field(key, data[key])
      }
    }

    console.log('[put multipart] files', files)
    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        const file = files[key]

        // handle file keys with '.' in it.
        if (!isUndefined(file) && !isNull(file)) {
          console.log('[put multipart] attach file', key)
          req.attach(key, file)
        } else {
          console.log('[put multipart] could not attach file', key)
        }
      }
    }

    req
      .set('Accept', 'application/json')
      .set(this.getHeaders(headers))
      .end((error, res) => {
        this.handleResponse(
          error,
          res,
          (json) => {
            success(json)
          },
          (apiError) => {
            failure(apiError)
          }
        )
      })
  }

  //
  // Requests tools for extern APIs
  //

  /**
   * Create an HTTP GET request.
   */
  getExtern(options) {
    const { url, query, headers, success, failure } = options

    request
      .get(url)
      .query(query)
      .set(headers)
      .end((error, res) => {
        if (!isNil(res) && this.isSuccessResponse(res.statusCode)) {
          success(res)
        } else {
          failure(error, res)
        }
      })
  }

  /**
   * Create an HTTP GET request.
   */
  postExtern(options) {
    const { url, data, headers, success, failure } = options

    request
      .post(url)
      .send(data)
      .set(headers)
      .end((error, res) => {
        if (!isNil(res) && this.isSuccessResponse(res.statusCode)) {
          success(res)
        } else {
          failure(error, res)
        }
      })
  }
}

let _apiManagerInstance = new ApiManager()

export default _apiManagerInstance
