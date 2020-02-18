import invariant from 'invariant'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import isUndefined from 'lodash/isUndefined'
import isFunction from 'lodash/isFunction'

import { __DEV__ } from '../environment'

import EventManager from '../event/EventManager'
import validatePlugin from './validatePlugin'

import generateModuleEntities from '../module/generateModuleEntities'
import generateModuleMiddlewares from '../module/generateModuleMiddlewares'

import { registerRouting } from 'reacticoon/routing'
//
// array of plugins config
// A plugin config is an object:
// - plugin
// - config
//
let _pluginsConfig = null

// allows to iterate `_pluginsConfig`
const forEachPlugin = callback =>
  _pluginsConfig.forEach(pluginConfig =>
    callback({ plugin: pluginConfig.plugin, config: pluginConfig.config })
  )

export const registerPlugins = pluginsConfig => {
  _pluginsConfig = Object.freeze(pluginsConfig.filter(Boolean))

  forEachPlugin(({ plugin, config }) => {
    // configuration checks
    if (__DEV__) {
      // TODO: verify plugin names collusion
      validatePlugin(plugin)
    }

    registerPluginEvents(plugin)

    registerPluginRoutes(plugin)

    //
    // register config on the plugin
    //
    plugin.registerConfig(config)
  })
}

const registerPluginEvents = plugin => {
  EventManager.registerEvents(plugin.events)
  EventManager.addListeners(plugin.eventsHandler)
}

const registerPluginRoutes = plugin => {
  if (isFunction(plugin.routing)) {
    registerRouting(plugin.routing)
  } else {
    console.info(`No routes found for plugin ${plugin.name}`)
  }
}

export const getPlugins = () => _pluginsConfig

export const getPlugin = pluginName => {
  const pluginConfig = find(_pluginsConfig, pluginConfig => pluginConfig.plugin.name === pluginName)

  invariant(
    !isUndefined(pluginConfig),
    `invalid plugin name '${pluginName}' or plugin not registed`
  )

  // we call getConfig() instead if `pluginConfig.config` since the `registerConfig` could change
  // the plugin configuration (add defaults, etc) and `pluginConfig.config` is the config set by
  // the user
  return pluginConfig.plugin
}

export const getPluginConfig = pluginName => {
  const pluginConfig = find(_pluginsConfig, pluginConfig => pluginConfig.plugin.name === pluginName)

  invariant(
    !isUndefined(pluginConfig),
    `invalid plugin name '${pluginName}' or plugin not registed`
  )

  // we call getConfig() instead if `pluginConfig.config` since the `registerConfig` could change
  // the plugin configuration (add defaults, etc) and `pluginConfig.config` is the config set by
  // the user
  return pluginConfig.plugin.getConfig()
}

export const generatePluginEntities = () => {
  let reducers = {}

  forEachPlugin(({ plugin, config }) => {
    //
    // add plugin modules reducers
    //
    const moduleReducers = generateModuleEntities(plugin.modules || [])
    if (__DEV__) {
      // add additionnal private debug var
      forEach(moduleReducers, (reducer, name) => {
        reducer.__plugin = plugin.name
      })
    }
    reducers = { ...reducers, ...moduleReducers }
  })

  return reducers
}

export const generatePluginMiddlewares = () => {
  let middlewares = []

  forEachPlugin(({ plugin, config }) => {
    const moduleMiddlewares = generateModuleMiddlewares(plugin.modules || [])
    if (__DEV__) {
      // add additionnal private debug var
      forEach(moduleMiddlewares, middleware => {
        middleware.__plugin = plugin.name
      })
    }
    middlewares = [...middlewares, ...moduleMiddlewares]
  })

  return middlewares
}

// plugins can contain a 'layoutViews' array that will be displayed on the Reacticoon Layout component
// Example: the Reacticoon dev tools debug bar
export const getLayoutViews = () => {
  let layoutViews = []

  forEachPlugin(({ plugin }) => {
    layoutViews = layoutViews.concat(plugin.layoutViews || [])
  })

  return layoutViews
}

/**
 * Returns the configurations set by extensions for the given plugin.
 * 
 * A plugin can extend another plugin by using the `extendPlugins` array.
 * 
 * Example:
 * 
 * ```
 * extendPlugins: [
    {
      plugin: 'ReacticoonDev',
      config: {
        devToolbar: {
          tabs: [
            {
              label: 'Api mock',
              view: DevPluginToolbarTab,
            },
          ],
        },
      },
    },
  ],
 * ```
 */
export const getPluginExtensions = pluginName => {
  const extensions = []

  forEachPlugin(({ plugin, config }) => {
    if (plugin.extendPlugins) {
      const extensionForPlugin = find(
        plugin.extendPlugins,
        extendPlugin => extendPlugin.plugin === pluginName
      )
      if (extensionForPlugin) {
        extensions.push({ ...extensionForPlugin, source: plugin.name })
      }
    }
  })

  return extensions
}
