import isString from 'lodash/isString'

export const isEventHandler = eventHandler => eventHandler && eventHandler.IS_EVENT_HANDLER === true

export const isEvent = event => event && event.IS_EVENT === true

export const getEventType = event => isString(event) ? event : event.type