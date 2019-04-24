import invariant from 'invariant'
import forEach from 'lodash/forEach'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'

import ReacticoonEvents from './ReacticoonEvents'

import { isEventHandler, isEvent } from './utils'

/**
 * Retrieve the given event. It can either be:
 * - the event type string
 * - the event object
 * - an event handler (that will contains the event object on the EVENT property) 
 */
const getEvent = event => {
  if (isString(event)) {
    return event
  }

  // handle event given as the event handler
  if (isFunction(event)) {
    if (event.__IS_EVENT_HANDLER) { // created with createEventHandler
      return event.EVENT
    } 
    
    if (event.EVENT) {
      // not created with createEventHandler but has an `EVENT`, just warn
      console.warn(`Event ${event.EVENT} given has not been created with 'createEventHandler'`)
      return event.EVENT
    }
  } 
  
  if (isEvent(event)) {
    return event
  }

  throw new Error(`Invalid event given: ${event}`)
}

/**
 * Manage dispatch of Reacticoon Events and plugins custom events
 */
class EventManager {
  /**
   * key: eventType
   * value: array of events
   */
  listeners = {}

  /**
   * Shortctut to ReacticoonEvents.
   * Also contains the plugins events. (see registerEvents)
   */
  Event = { ...ReacticoonEvents }

  getEvents() {
    return this.Event
  }

  getListeners() {
    return this.listeners
  }

  addListener(eventType, fn) {
    if (isFunction(eventType) && !fn) { // given directly an event handler
      // TODO:      
      // - verify event is listed on Reacticoon events or plugins events
      const eventHandler = eventType
      invariant(isEventHandler(eventHandler), `invalid event handler given`)
      this.listeners[eventHandler.TYPE] = eventHandler
    } else {
      // TODO:
      // - verify fn is a function
      // - verify event is listed on Reacticoon events or plugins events
      this.listeners[eventType] = [...(this.listeners[eventType] || []), fn]
    }
  }

  dispatch(eventParam, data = {}) {
    const event = getEvent(eventParam)

    const listeners = this.listeners[event.type]

    // TODO: dev log

    if (listeners !== undefined) {
      listeners.forEach(listener => {
        listener({
          type: event.type,
          data,
        })
      })
    }
  }

  registerEvents(events = []) {
    invariant(isArray(events), `registerEvents: events must be an array, ${typeof events} given`)

    const eventsAsObject = {}

    events.forEach(event => {
      eventsAsObject[event.TYPE] = event.description
    })

    // TODO: in dev, verify that there is no collusion
    this.Events = { ...this.Events, eventsAsObject }
  }

  addListeners(listenersParam) {
    let listeners = listenersParam

    // allow to receive a parameters as an array of createEventHandler.
    if (isArray(listenersParam)) {
      listeners = {}
      listenersParam.forEach(listener => {
        invariant(isEventHandler(listener), `listener must be created with 'createEventHandler', ${typeof listener} given.`)
        listeners[listener.EVENT.type] = listener
      })
    }

    forEach(listeners, (fn, eventType) => {
      this.addListener(eventType, fn)
    })
  }
}

// EventManager is a Singleton
const eventManager = new EventManager()

if (window) {
  // allows non reacticoon app to interact with Reacticoon
  window.reacticoonEventManager = eventManager
}

export default eventManager
