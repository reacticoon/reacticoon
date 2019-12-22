import { EventManager } from 'reacticoon/event'

/**
 * Creates a proxy console.
 */
function proxyConsole(type, callback) {
  if (typeof console !== 'undefined') {
    var orig = console[type]
    if (typeof orig === 'function') {
      console[type] = function __reacticoon_proxy_console__() {
        try {
          var _message = arguments[0]
          if (typeof _message === 'string') {
            callback(_message)
          }
        } catch (err) {
          // Warnings must never crash. Rethrow with a clean stack.
          setTimeout(function() {
            throw err
          })
        }
        return orig.apply(this, arguments)
      }
    }
  }
}

// Proxy console.
//
// Our goal is to catch some error messages and create a Reacticoon event for it, allowing to:
// - log it on reacticoon UI
// - display notification
// - list react errors
//
export const initConsoleCatcher = () => {
  //
  // proxy console.error.
  //
  proxyConsole('error', message => {
    // TODO: allow plugins to add their own custom catcher ?
    // For example a plugin that abstract a library could use this feature.
    // But enforce good practice to send event directly AND console.x if possible.

    if (message && message.startsWith('Warning: Failed prop type:')) {
      // TODO: log as event warning
      EventManager.dispatch(EventManager.Event.LOG_WARN, {
        type: message,
        detail: '',
      })
    }

    // handle:
    // Warning: validateDOMNesting
    // Material-UI:
  })

  proxyConsole('warn', message => {
    // TODO: allow plugins to add their own custom catcher ?
    // For example a plugin that abstract a library could use this feature.
    // But enforce good practice to send event directly AND console.x if possible.
    // TODO: disabled for now since it infinite loop
    // if (message && message.startsWith('Warning: Failed prop type:')) {
    //   // TODO: log as event warning
    //   EventManager.dispatch(EventManager.Event.LOG_WARN, {
    //     type: message,
    //     detail: '',
    //   })
    // }
  })
}
