import map from 'lodash/map'
import forEach from 'lodash/forEach'
import { EventManager, ReacticoonEvents, createEventHandler } from 'reacticoon/event'
import { __DEV__ } from 'reacticoon/environment'
import { getPluginsConfig } from 'reacticoon/plugin'
import { getModules } from 'reacticoon/module'

const onAppInit = createEventHandler(ReacticoonEvents.ON_APP_INIT, () => {
  if (__DEV__) {
    //
    // Plugins
    //
    console.groupCollapsed('[Reacticoon][Plugin][registered]');
    getPluginsConfig().forEach(({ plugin, config }) => {
      console.info(`${plugin.name} ${plugin.description}`)
    })
    console.groupEnd('[Plugin][registered]');

    //
    // Event - events
    //
    console.groupCollapsed('[Reacticoon][Event][Events]');
    console.table(map(EventManager.getEvents(), ({ type, description }, name) => ({
      name,
      description,
      type,
    })))
    console.groupEnd('[Reacticoon][Event][Events]');

    //
    // Event - handlers
    //
    console.groupCollapsed('[Reacticoon][Event][handlers]');
    forEach(EventManager.getListeners(), (listeners, event) => {
      console.groupCollapsed(`${event} (${listeners.length} handlers)`);
      console.info(listeners)
      console.groupEnd();
    })
    console.groupEnd('[Reacticoon][Event][handlers]');

    //
    // Modules
    //
    console.groupCollapsed('[Reacticoon][Module]');
    forEach(getModules(), ((module) => {
      console.groupCollapsed(`${module.name}`)
      console.log(module)
      console.groupEnd();
    }))
    console.groupEnd();

    //
    // TODO:
    // - middlewares on appMiddleware ?
    // - entities ?
    //
  }
})

export default onAppInit
