import invariant from 'invariant'
import isEmpty from 'lodash/isEmpty'
import isUndefined from 'lodash/isUndefined'
import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'

// TODO: more validations
const validatePlugin = plugin => {
  invariant(!isUndefined(plugin), `${plugin}: Invalid plugin given: plugin is undefined`)

  invariant(plugin.__IS_PLUGIN === true, `${plugin}: must be created with 'createPlugin' method`)

  // plugin name
  invariant(!isEmpty(plugin.name), 'Plugin name not defined')

  invariant(isFunction(plugin.registerConfig), `${plugin.name}: registerConfig is not a function`)

  //
  // events handler
  //
  invariant(
    isEmpty(plugin.eventsHandler) || isArray(plugin.eventsHandler),
    `plugin 'eventsHandler' must be an array`
  )
  plugin.eventsHandler.forEach(event => {
    invariant(
      event.__IS_EVENT_HANDLER,
      `plugin 'eventsHandler' event ${event.name} must be created with 'createEventListener'`
    )
  })

  //
  // events
  //
  invariant(isEmpty(plugin.events) || isArray(plugin.events), `plugin 'events' must be an array`)
  plugin.events.forEach(event => {
    // Must be an event or an event handler
    invariant(
      event.__IS_EVENT || event.__IS_EVENT_HANDLER,
      `plugin 'events' event ${event} must be created with 'createEvent'`
    )
  })

  //
  // routes
  //
  if (plugin.routing && !isEmpty(plugin.routing.routes)) {
    const routing = plugin.routing
    // TODO: validate routes
    invariant(!isUndefined(routing.routingEnum), `[plugin][${plugin.name}] Invalid routing enum`)

    invariant(!isUndefined(routing.routes), `[plugin][${plugin.name}] Invalid routes`)

    routing.routes.forEach(route => {
      invariant(!isUndefined(route.definition), `Missing route definition`)
    })
  }
}

export default validatePlugin
