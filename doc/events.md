# Reacticoon events

Reacticoon use events, that allows `plugins` to interact between them 
and with the Reacticoon app.

Note: an `event` differ from a redux action: a redux action will be 
eventually catch by a middleware, and used by a reducer to update the
state.
A reacticoon event does is not handle by a reducer nor a middleware.
It is handle by `listeners` functions, that will make some work for the
internal of the Reacticoon application, such as:

- intialize a plugin / configuration
- receive logs
- set context

## Event list

There are two types of events:

- Reacticoon events, define on `reacticoon/event/reacticoonEvents.js` (TODO: link to github file)
- Plugins events, define by the plugins that we register on `app/config/plugins`
