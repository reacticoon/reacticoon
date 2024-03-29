import invariant from 'invariant'
import { isDebugLogLevel } from 'reacticoon/environment'
import { isEvent } from './utils'

/**
 * Creates an event listener
 */
const createEventListener = (event, callback) => {
  invariant(isEvent(event), `createEventListener: an event must be given, ${typeof event} given`)

  // attach event name
  callback.EVENT = event
  callback.__IS_EVENT_HANDLER = true
  if (isDebugLogLevel()) {
    callback.__description = `event handler for event ${event.type} (${event.description})`
  }

  return callback
}

export default createEventListener
