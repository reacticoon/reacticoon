//
// define default plugin data
//
const generateDefaultPluginConfig = () => {
  // private data
  let _config = null

  // return default config
  return {
    // empty list of modules
    modules: [],
    // no events to use
    events: {},
    // no custom events
    customEvents: {},
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
