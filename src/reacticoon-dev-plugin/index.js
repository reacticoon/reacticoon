import { createPlugin } from 'reacticoon/plugin'

import onAppInit from './events/onAppInit'
import routing from './config/routing'
import commandModule from './modules/command'

//
// Dev plugin for reacticoon. Provides pages and debug utils
//
const ReacticoonDevPlugin = createPlugin({
  // The plugin name. Must be unique. All Reacticoon plugins have the 'Reacticoon' prefix.
  name: 'ReacticoonDev',
  description: 'Reacticoon plugin displayed on development.',
  // list of the modules that the plugin register.
  // optionnal.
  modules: [
    commandModule,
  ],
  // Describe listeners for a particular event.
  // optionnal.
  eventsHandler: [
    onAppInit,
  ],
  routing,
})

export default ReacticoonDevPlugin
