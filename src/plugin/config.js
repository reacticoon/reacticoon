import invariant from 'invariant'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import isUndefined from 'lodash/isUndefined'
import isFunction from 'lodash/isFunction'
import isEmpty from 'lodash/isEmpty'
import isArray from 'lodash/isArray'

import { __DEV__ } from '../environment'

import EventManager from '../event/EventManager'
import validatePlugin from './validatePlugin'

import generateModuleEntities from '../module/generateModuleEntities'
import generateModuleMiddlewares from '../module/generateModuleMiddlewares'

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
  console.group("[Plugin][registered]");

  _pluginsConfig = Object.freeze(pluginsConfig)

  forEachPlugin(({ plugin, config }) => {
    invariant(!isUndefined(plugin), `${plugin}: Invalid plugin given: plugin is undefined`)

    invariant(isEmpty(plugin.eventsHandler) || isArray(plugin.eventsHandler), `plugin 'eventsHandler' must be an array`)
    
    plugin.eventsHandler.forEach(event => {
      invariant(
        event.IS_EVENT_HANDLER, 
        `plugin 'eventsHandler' event ${event.name} must be created with 'createEventHandler'`
      )
    })

    registerPluginEvents(plugin)

    //
    // register config on the plugin
    //
    invariant(isFunction(plugin.registerConfig), `${plugin.name}: registerConfig is not a function`)
    plugin.registerConfig(config)

    // TODO: in dev only
    // -- verify plugin names collusion

    // -- verify plugin config
    validatePlugin(plugin)

    console.info(`${plugin.name}`)
  })
  console.groupEnd("[Plugin][registered]");
}

const registerPluginEvents = plugin => {
  EventManager.registerEvents(plugin.events)
  EventManager.addListeners(plugin.eventsHandler)
}

export const getPluginConfig = pluginName => {
  const pluginConfig = find(_pluginsConfig, pluginConfig => pluginConfig.plugin.name === pluginName)

  invariant(!isUndefined(pluginConfig), `invalid plugin name '${pluginName}' or plugin not registed`)

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
        reducer._plugin = plugin.name
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
      forEach(moduleMiddlewares, (middleware) => {
        middleware._plugin = plugin.name
      })
    }
    middlewares = [...middlewares, ...moduleMiddlewares]
  })

  return middlewares
}
