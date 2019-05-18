import invariant from 'invariant'
import { __DEV__ } from 'reacticoon/environment'
import { isEvent } from './utils'

/**
 * Creates an event handler
 */
const createEventHandler = (event, callback) => {
  invariant(isEvent(event), `createEventHandler: an event must be given, ${typeof event} given`)

  // attach event name
  callback.EVENT = event
  callback.__IS_EVENT_HANDLER = true
  if (__DEV__) {
    callback.__description = `event handler for event ${event.type} (${event.description})`
  }

  return callback
}

export default createEventHandler
