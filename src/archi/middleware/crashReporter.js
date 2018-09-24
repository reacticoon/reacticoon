/**
 * middleware that catch any error while dispatching an action
 *
 *
 * @link https://blog.sentry.io/2016/08/24/redux-middleware-error-logging
 *
 * see https://github.com/captbaritone/raven-for-redux/blob/master/index.js
 *
 * https://github.com/ngokevin/redux-raven-middleware/blob/master/index.es6
 *
 */

import isNil from 'lodash/isNil'
import { EventManager } from '../../event'

const crashReporter = store => next => action => {
  try {
    if (isNil(action)) {
      EventManager.dispatch(EventManager.Event.LOG_WARN, {
        type: 'crashReporter',
        detail: 'Action is nil',
      })
    } else {
      return next(action) // dispatch
    }
  } catch (err) {
    EventManager.dispatch(EventManager.Events.LOG_EXCEPTION, {
      err,
      action,
      state: store.getState(),
    })

    throw err // re-throw error in order to be seen on console
  }
}

export default crashReporter
