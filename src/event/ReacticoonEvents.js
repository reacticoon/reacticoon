/**
 * Listing of all the events used by Reacticoon.
 * All the events are public if it is not specified there are not.
 *
 * Note: Plugins can defines there custom events via the `customEvents` config.
 */
const ReacticoonEvents = {
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
  ON_APP_INIT: 'REACTICOON::ON_APP_INIT',

  //
  // -- Logger events
  //

  //
  // props:
  // - type
  // - detail
  //
  LOG_WARN: 'REACTICOON::LOG::WARN',

  //
  // props:
  // - type
  // - detail
  //
  LOG_NOT_IMPLEMENTED: 'REACTICOON::LOG::NOT_IMPLEMENTED',

  //
  // props:
  // - type
  // - detail
  //
  LOG_ERROR: 'REACTICOON::LOG::ERROR',

  //
  // props:
  // - ex
  // - context
  //
  LOG_EXCEPTION: 'REACTICOON::LOG::EXCEPTION',

  //
  // props:
  // - error
  // - info
  //
  LOG_COMPONENT_DID_CATCH: 'REACTICOON::LOG::COMPONENT_DID_CATCH',

  //
  // Called when there is an exception on an action
  //
  // props:
  // - err
  // - action
  // - state
  //
  LOG_REDUX_EXCEPTION: 'REACTICOON::LOG::LOG_REDUX_EXCEPTION',

  //
  // -- User context events
  // User context is usefull for logging (console / error tracking (ex: sentry))
  //

  SET_USER_CONTEXT: 'REACTICOON::USER_CONTEXT::SET',
  CLEAR_USER_CONTEXT: 'REACTICOON::USER_CONTEXT::CLEAR',

  //
  // -- form
  // Note: those events are generic for any form plugin to allow replace the `reacticoon-form` plugin
  // We consider it as a reacticoon/event, since form handling should be used on any Reacticoon
  // app.
  //
  REGISTER_FORM: 'REACTICOON::REGISTER_FORM',
}

export default ReacticoonEvents
