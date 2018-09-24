import forEach from 'lodash/forEach'
import ReacticoonEvents from './ReacticoonEvents'

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

  addListener(eventType, fn) {
    this.listeners[eventType] = [...(this.listeners[eventType] || []), fn]

    // TODO:
    // - verify fn is a function
    // - verify event is listed on Reacticoon events or plugins events
  }

  dispatch(eventType, data = {}) {
    const listeners = this.listeners[eventType]

    // TODO: dev log

    if (listeners !== undefined) {
      listeners.forEach(listener => {
        listener({
          type: eventType,
          data,
        })
      })
    }
  }

  registerEvents(events) {
    // TODO: in dev, verify that there is no collusion
    this.Events = { ...this.Events, ...events }
  }

  addListeners(listeners) {
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
