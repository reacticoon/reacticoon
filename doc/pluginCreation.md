# Reacticoon plugin creation

## Introduction

`Reacticoon` can be extended via `plugins`.

- Plugins are configured in the appConfig.
- Plugins can contains from zero to multiple modules
- Plugins have access to the `Reacticoon` architecture

## Configuration

Example:

```javascript
import { createPlugin } from 'reacticoon/plugin'

const myPlugin = createPlugin({
  modules: [
    
  ],
  events: {
    [reacticoon/event.ON_APP_INIT]: handleAppInit,
    [MY_CUSTOM_EVENT]: handleMyCustomEvent,
  },
  customEvents: {
    [MY_CUSTOM_EVENT]: 'documentation about the event',
  },
})
```

### `modules`

Optionnal.

Contains a list of modules.

### `events`

Object that defines listeners to attach to events.
An event can be a Reacticoon event (see ... TODO: link to doc) or a plugin custom event.

### `customEvents`

Define the custom events used by the plugin.

Note: `events` are not `actions`. `Actions` are used on a redux context to be dispatched and handled by middlewares.
`events` are used in the `Application` context, while initializing the `Application`, or during the `Application` lifecycle.
It can also be used to notify context (ex: logger plugin(s), analytics plugin(s))

Notes:

- it is mandatory to create this, since we verify that each event fired by the `EventManager` is registered either on `customEvents` or in Reacticoon `Events`.
- we verify that there is no collision in registered event names
- to avoid collision, it is recommanded to prefix the event name with the plugin name

Ex: `REACTOON_PLUGIN_EXAMPLE::customEventName`

