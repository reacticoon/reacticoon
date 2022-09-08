import invariant from 'invariant'
import moment from 'moment'
import map from 'lodash/map'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'

import ReacticoonEvents from './ReacticoonEvents'

import { isEventHandler, isEvent, isSameEvent } from './utils'
import createEventListener from "./createEventListener"


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
  
  createEventListener = createEventListener;

  /**
   * Retrieve the given event. It can either be:
   * - the event type string
   * - the event object
   * - an event handler (that will contains the event object on the EVENT property)
   */
  getEvent(event) {
    if (isString(event)) {
      return (
        this.Event[event] ||
        find(this.Event, (e) => e.type === event)
      );
    }

    // handle event given as the event handler
    if (isFunction(event)) {
      if (event.__IS_EVENT_HANDLER) {
        // created with createEventListener
        return event.EVENT
      }

      if (event.EVENT) {
        // not created with createEventListener but has an `EVENT`, just warn
        console.warn(`Event ${event.EVENT} given has not been created with 'createEventListener'`)
        return event.EVENT
      }
    }

    if (isEvent(event)) {
      return event
    }

    throw new Error(`Invalid event given: ${event}`)
  }

  getEvents() {
    return this.Event
  }

  getEventDefinitions() {
    return map(this.Event, (definition, eventName) => ({
      eventName,
      definition,
    }))
  }

  getEventDataForType(type) {
    let eventData

    map(this.getEvents(), (definition, eventName) => {
      if (definition.type === type) {
        eventData = {
          eventName,
          definition,
        }
        return false // quit map loop
      }
    })

    if (!eventData) {
      // happens when an event is dispatched but never registered via regsiterEvents
      eventData = {
        eventName: type,
        definition: {},
        error: true,
      }
    }
    return eventData
  }

  getListeners() {
    return this.listeners
  }

  addListener(eventType, fn) {
    if (isFunction(eventType) && !fn) {
      // given directly an event handler
      // TODO:
      // - verify event is listed on Reacticoon events or plugins events
      const eventHandler = eventType
      invariant(isEventHandler(eventHandler), `invalid event handler given`)
      this.listeners[eventHandler.EVENT.type] = [
        ...(this.listeners[eventHandler.EVENT.type] || []),
        eventHandler,
      ]
    } else {
      // TODO:
      // - verify event is listed on Reacticoon events or plugins events

      invariant(isFunction(fn), `listener must be a function. Found: ${fn}`)

      this.listeners[eventType] = [...(this.listeners[eventType] || []), fn]
    }
  }

  // TODO: rename data to payload?
  dispatch(eventParam, data = {}) {
    const eventDefinition = this.getEvent(eventParam)

    const date = new Date()

    const listeners = [
      // add listeners that listen for any event
      ...(this.listeners[ReacticoonEvents.ALL_EVENTS.type] || []),
      // add listeners specific for this event
      ...(this.listeners[eventDefinition.type] || []),
    ]

    // we do some work for exceptions events.
    if (isSameEvent(eventDefinition, ReacticoonEvents.LOG_EXCEPTION)) {
      // we cannot save an exception on our store
      // we modify our event by reference here.

      // since 'ex' could be forgotten and used exception / e instead, we handle theme here.
      const exception = data.ex || data.exception || data.e
      if (exception && exception.stack) {
        data.exceptionMessage = exception.message
        data.exceptionStack = exception.stack.toString()
        // cannot dispatch exception object
        delete data.ex
        delete data.exception
        delete data.exe
      }
    }

    // create the event, since we create it here, the listener could alter it by reference.
    // but making a copy of the data for each listener / just here is performance-costing.
    // TODO: specify on listener / event doc to not modify the event by reference.
    const event = {
      type: eventDefinition.type,
      data,
      date,
      // TODO: only on dev and better format
      __readableDate: moment(date).format('HH:mm:ss:SSS'),
    }

    listeners.forEach(listener => {
      try {
        listener(event)
      } catch (ex) {
        console.group('event dispatch error')
        console.log(`An error occured while dispatching the event on the listener`)
        console.log({ event, listener })
        console.error(ex)
        console.groupEnd('event dispatch error')
      }
    })
  }

  registerEvents(events = []) {
    invariant(isArray(events), `registerEvents: events must be an array, ${typeof events} given`)

    const eventsAsObject = {}

    events.forEach(event => {
      if (event.__IS_EVENT_HANDLER) {
        eventsAsObject[event.EVENT.type] = event.EVENT
      } else if (event.__IS_EVENT) {
        eventsAsObject[event.type] = event
      } else {
        invariant(false, `Invalid event given to registerEvents: ${event}`)
      }
    })

    // TODO: in dev, verify that there is no collusion (duplicates)
    this.Event = { ...this.Event, ...eventsAsObject }
  }

  addListeners(listenersParam) {
    let listeners = listenersParam

    // allow to receive a parameters as an array of createEventListener.
    if (isArray(listenersParam)) {
      listeners = {}
      listenersParam.forEach(listener => {
        invariant(
          isEventHandler(listener),
          `listener must be created with 'createEventListener', ${typeof listener} given.`
        )
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
