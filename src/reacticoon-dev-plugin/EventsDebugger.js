import isEmpty from 'lodash/isEmpty'
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

// TRICK: to remove. the goal is to retain events that failed to be dispatch (mostly because we are
/// already dispatching) and dispatch them later
let retainer = []
class EventsDebugger {
  constructor() {
    this.eventsListener = createEventsListener(this.onEventReceived)
  }

  onEventReceived = event => {
    try {
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

      if (!isEmpty(retainer)) {
        this.retry()
      }
    } catch (ex) {
      // catch to avoid infinite loop errors.
      // can be: "Error: You may not call store.getState() while the reducer is executing. The
      // reducer has already received the state as an argument. Pass it down from the top reducer
      // instead of reading it from the store." when dispatching here while dispatching
      // TODO: find a fix.
      // To test: make a reducer crash (with infinite reference for example).
      // console.error(ex)
      retainer.push(event)

      this.retry()
    }
  }

  retry() {
    const toSend = [...retainer]
    retainer = []
    setTimeout(() => {
      toSend.forEach(event => {
        this.onEventReceived(event)
      })
    }, 1000)
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
