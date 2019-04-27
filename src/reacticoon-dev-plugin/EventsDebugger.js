import { EventManager, ReacticoonEvents, createEventHandler } from 'reacticoon/event'
import { getStore } from 'reacticoon/store'
import { saveEvent } from './modules/events/actions'
import { getEvents } from './modules/events/selectors'
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
    // this.events = []
  }

  onEventReceived = event => {
    const data = { ...event, ...EventManager.getEventDataForType(event.type) }
    // this.events.push(data)
    getStore().dispatch(saveEvent(data))
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
