import forEach from 'lodash/forEach'
import { EventManager, createEventListener } from 'reacticoon/event'
import { combineReducers } from 'redux'
import { getStore } from 'reacticoon/store'
import generateModuleEntities from 'reacticoon/module/generateModuleEntities'
import ReducerRegistry from '../registry/ReducerRegistry'
import MiddlewareRegistry from '../registry/MiddlewareRegistry'
import generateModuleMiddlewares from '../../module/generateModuleMiddlewares'

const combine = reducers => {
  // const reducerNames = Object.keys(reducers);
  // Object.keys(initialState).forEach(item => {
  //   if (reducerNames.indexOf(item) === -1) {
  //     reducers[item] = (state = null) => state;
  //   }
  // });
  return combineReducers(reducers)
}

const OnModuleRegistered = createEventListener(EventManager.Event.REGISTER_MODULES, event => {
  //
  // reducers
  //
  const reducers = generateModuleEntities(event.data.newModules)
  forEach(reducers, (reducer, reducerName) => ReducerRegistry.register(reducerName, reducer))
  getStore().replaceReducer(combine(ReducerRegistry.getReducers()))

  //
  // middlewares
  //
  const middlewares = generateModuleMiddlewares(event.data.newModules)
  MiddlewareRegistry.register(middlewares)
})

export default OnModuleRegistered
