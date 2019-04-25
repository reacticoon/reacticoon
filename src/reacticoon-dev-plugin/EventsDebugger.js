import { EventManager, ReacticoonEvents, createEventHandler } from 'reacticoon/event'

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
    this.events = []
  }

  onEventReceived = event => {
    this.events.push({ ...event, ...EventManager.getEventDataForType(event.type) })
  }

  getListener() {
    return this.eventsListener
  }

  getEvents() {
    return this.events
  }
}

export default new EventsDebugger()
