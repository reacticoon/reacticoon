import { createPlugin } from 'reacticoon/plugin'
import { ReacticoonEvents } from 'reacticoon/event'

import onAppInit from './events/onAppInit'

//
// Default plugin for reacticoon
// `createPlugin` will verify that the given configuration is correct, and add default configuration
//
//
const ReacticoonDefaultPlugin = createPlugin({
  // The plugin name. Must be unique. All Reacticoon plugins have the 'Reacticoon' prefix.
  name: 'ReacticoonDefaultPlugin',
  description: 'Default plugin of Reacticoon.',
  // list of the modules that the plugin register.
  // optionnal.
  modules: [],
  // Describe listeners for a particular event.
  // optionnal.
  eventsHandler: [
    onAppInit,
  ],
})

export default ReacticoonDefaultPlugin
