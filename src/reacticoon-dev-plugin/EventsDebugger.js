import { EventManager, ReacticoonEvents, createEventHandler } from 'reacticoon/event'
import { getStore } from 'reacticoon/store'
import { saveEvent } from './modules/events/actions'
import { getEvents } from './modules/events/selectors'

import { setUserContext, clearUserContext } from './modules/userContext/actions'

/**
 * Listen for all the Reacticoon events.
 */
const createEventsListener = callback =>
  createEventHandler(ReacticoonEvents.ALL_EVENTS, event => {
    console.groupCollapsed(`[Reacticoon][event] [${event.__readableDate}] ${event.type}`)
    console.log(event.data)
    console.groupEnd()
    callback(event)
  })

class EventsDebugger {
  constructor() {
    this.eventsListener = createEventsListener(this.onEventReceived)
  }

  onEventReceived = event => {
    const data = { ...event, ...EventManager.getEventDataForType(event.type) }
    getStore().dispatch(saveEvent(data))

    switch (event.type) {
      case ReacticoonEvents.SET_USER_CONTEXT.type:
        getStore().dispatch(setUserContext(event.data))
        break

      case ReacticoonEvents.CLEAR_USER_CONTEXT.type:
        getStore().dispatch(clearUserContext())
        break

      default:
      // no specific behaviour for this event
    }
  }

  getListener() {
    return this.eventsListener
  }

  getEvents() {
    // return this.events
    return getEvents(getStore().getState())
  }
}

export default new EventsDebugger()
