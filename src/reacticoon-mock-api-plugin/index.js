import { createPlugin } from 'reacticoon/plugin'

import onAppInit from './events/onAppInit'

//
// Dev plugin for reacticoon. Provides pages and debug utils
//
const ReacticoonMockApiPlugin = createPlugin({
  // The plugin name. Must be unique. All Reacticoon plugins have the 'Reacticoon' prefix.
  name: 'ReacticoonMockApiPlugin',
  description: 'Reacticoon plugin used to mock api calls for testing.',
  // list of the modules that the plugin register.
  // optionnal.
  modules: [],
  // Describe listeners for a particular event.
  // optionnal.
  eventsHandler: [onAppInit],
})

export default ReacticoonMockApiPlugin
