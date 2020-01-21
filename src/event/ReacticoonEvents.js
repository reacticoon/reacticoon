import createEvent from './createEvent'

/**
 * Listing of all the events used by Reacticoon.
 * All the events are public if it is not specified there are not.
 *
 * Note: Plugins can defines there custom events via the `customEvents` config.
 */
const ReacticoonEvents = {
  ALL_EVENTS: createEvent(
    'REACTICOON::ALL_EVENTS',
    'Specific event used by listeners to receive all the events dispatched.'
  ),

  //
  // Dispatched once the `Application` is initialized, but before rendering any react component.
  //
  // Use it to:
  //
  // - initialize the plugin
  // Note: the plugin configuration is automatically register via the plugin `registerConfig` function.
  // So we don't need to `registerConfig` in here.
  // Use this function to interact with other plugins, initialize the libraries
  //
  // Props:
  // - appConfig
  //
  ON_APP_INIT: createEvent('REACTICOON::ON_APP_INIT', 'Dispatched when the app is initialized'),

  //
  // Dispatched when we init the app, to register our modules and when a module is registered via
  // code splitting.
  //
  //
  REGISTER_MODULES: createEvent('REACTICOON::REGISTER_MODULES', 'Registerind multiple modules'),

  //
  // -- Logger events
  //

  //
  // props:
  // - type
  // - detail
  //
  LOG_WARN: createEvent('REACTICOON::LOG::WARN', 'For warning log'),

  //
  // props:
  // - type
  // - detail
  //
  LOG_NOT_IMPLEMENTED: createEvent(
    'REACTICOON::LOG::NOT_IMPLEMENTED',
    'For not implemented warning'
  ),

  //
  // props:
  // - type
  // - detail
  //
  LOG_DEPRECATION: createEvent('REACTICOON::LOG::DEPRECATION', 'For deprecation warning'),

  //
  // props:
  // - type
  // - detail
  //
  LOG_ERROR: createEvent('REACTICOON::LOG::ERROR', 'For errpr log'),

  //
  // props:
  // - ex
  // - context
  //
  LOG_EXCEPTION: createEvent('REACTICOON::LOG::EXCEPTION', 'For exception error'),

  //
  // props:
  // - error
  // - info
  //
  LOG_COMPONENT_DID_CATCH: createEvent(
    'REACTICOON::LOG::COMPONENT_DID_CATCH',
    'For componentDidCatch log'
  ),

  //
  // Called when there is an exception on an action
  //
  // props:
  // - err
  // - action
  // - state
  //
  LOG_REDUX_EXCEPTION: createEvent(
    'REACTICOON::LOG::LOG_REDUX_EXCEPTION',
    'For redux exception, exception that occured on an action dispatch'
  ),

  //
  //
  //

  ON_HISTORY_CHANGE: createEvent('REACTICOON::HISTORY::CHANGE', 'When location on history change'),

  //
  // -- User context events
  // User context is usefull for logging (console / error tracking (ex: sentry))
  //

  SET_USER_CONTEXT: createEvent(
    'REACTICOON::USER_CONTEXT::SET',
    'Global event to set the user context'
  ),

  CLEAR_USER_CONTEXT: createEvent(
    'REACTICOON::USER_CONTEXT::CLEAR',
    'Global event to clear the user context'
  ),

  //
  // -- form
  // Note: those events are generic for any form plugin to allow replace the `reacticoon-plugin-form` plugin
  // We consider it as a reacticoon/event, since form handling should be used on any Reacticoon
  // app.
  //
  REGISTER_FORM: createEvent('REACTICOON::REGISTER_FORM', 'Global event to register a form'),
}

export default ReacticoonEvents
