import isString from 'lodash/isString'

export const isEventHandler = eventHandler =>
  eventHandler && eventHandler.__IS_EVENT_HANDLER === true

export const isEvent = event => event && event.__IS_EVENT === true

export const getEventType = event => (isString(event) ? event : event.type)

export const isSameEvent = (event, definition) =>
  (event.type ? event.type : event.definition.type) === definition.type
