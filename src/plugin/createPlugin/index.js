//
// define default plugin data
//
const generateDefaultPluginConfig = () => {
  // private data
  let _config = null

  // return default config
  return {
    description: '',
    // empty list of modules
    modules: [],
    // no events handler to use
    eventsHandler: [],
    // no events to define
    events: [],
    // routes of the plugin
    routing: {
      routeEnum: {}, // enumeration of the routes for the plugin
      routes: [], // routes for this plugin
    },
    // array of component views to add on the Reacticoon Layout
    layoutViews: [],
    // allows plugins to extend other plugins.
    // contains object:
    // { plugin: 'ReacticoonDev', config: {} }
    extendPlugins: [],
    //
    // register the front config for this plugin
    //
    registerConfig: config => {
      _config = config
    },
    // retrieve the saved config
    getConfig: () => {
      return _config
    },

    __IS_PLUGIN: true,
  }
}

const createPlugin = pluginConfigParam => {
  const pluginConfig = {
    ...generateDefaultPluginConfig(),
    ...pluginConfigParam,
  }

  return pluginConfig
}

export default createPlugin
