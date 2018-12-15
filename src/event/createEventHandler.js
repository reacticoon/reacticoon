import invariant from 'invariant'
import { isEvent } from './utils'

/**
 * Creates an event handler
 */
const createEventHandler = (event, callback) => {
  invariant(isEvent(event), `createEventHandler: an event must be given, ${typeof event} given`)

  // attach event name
  callback.EVENT = event
  callback.__IS_EVENT_HANDLER = true
  return callback
}

export default createEventHandler
