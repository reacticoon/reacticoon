import invariant from 'invariant'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import isUndefined from 'lodash/isUndefined'
import isEmpty from 'lodash/isEmpty'

import { __DEV__ } from '../environment'

import EventManager from '../event/EventManager'
import validatePlugin from './validatePlugin'

import generateModuleEntities from '../module/generateModuleEntities'
import generateModuleMiddlewares from '../module/generateModuleMiddlewares'

import { addRoutingEnum, addRoutes } from 'reacticoon/routing'

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
  _pluginsConfig = Object.freeze(pluginsConfig)

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
  if (plugin.routing && !isEmpty(plugin.routing.routes)) {
    const routing = plugin.routing
    if (__DEV__) {
      // add additionnal private debug var
      forEach(routing.routingEnum, definition => {
        definition.__plugin = plugin.name
      })
    }

    addRoutes(routing.routes)
    addRoutingEnum(routing.routingEnum)
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

  getPlugins().forEach(pluginConfig => {
    layoutViews = layoutViews.concat(pluginConfig.plugin.layoutViews || [])
  })

  return layoutViews
}
