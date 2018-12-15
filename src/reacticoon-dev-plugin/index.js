import { createPlugin } from 'reacticoon/plugin'
import { ReacticoonEvents } from 'reacticoon/event'

import onAppInit from './events/onAppInit'
import routing from './config/routing'

//
// Dev plugin for reacticoon. Provides pages and debug utils
//
const ReacticoonDevPlugin = createPlugin({
  // The plugin name. Must be unique. All Reacticoon plugins have the 'Reacticoon' prefix.
  name: 'ReacticoonDevPlugin',
  description: 'Reacticoon plugin displayed on development.',
  // list of the modules that the plugin register.
  // optionnal.
  modules: [],
  // Describe listeners for a particular event.
  // optionnal.
  eventsHandler: [
    onAppInit,
  ],
  routing,
})

export default ReacticoonDevPlugin
