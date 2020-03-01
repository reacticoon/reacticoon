import { routerMiddleware } from 'react-router-redux'
import { getHistory } from 'reacticoon/routing'

import reacticoonReduxThunk from './reacticoonReduxThunk'
import crashReporter from '../middleware/crashReporter'

import apiMiddleware from '../../api/apiMiddleware'
import createAppMiddleware from '../../middleware/appMiddleware/createAppMiddleware'

const generateMiddlewares = (isDev, appMiddlewares) =>
  [
    // Redux middleware that spits an error when we try to mutate the state either inside
    // a dispatch or between dispatches.
    // For development use only
    // https://github.com/leoasis/redux-immutable-state-invariant
    FEATURE_REACTICOON_HEAVY_DEBUG ? require('redux-immutable-state-invariant').default() : null,
    reacticoonReduxThunk,
    apiMiddleware,
    crashReporter, // must be before reduxLogger and after thunk and api
    FEATURE_REACTICOON_HEAVY_DEBUG
      ? require('redux-logger').createLogger({
          collapsed: true,
        })
      : null, // only on dev, but requires to be at this specific place

    createAppMiddleware(appMiddlewares),

    // FIXME: the router middleware has to be in the end, the actions made on middleware will not
    // work..
    //
    //
    // react-router-redux need this middleware to handle functions such as `push(location)`,
    // `replace(loacation)`
    // It handle actions creators that correspond with the history methods of the same name.
    // see https://github.com/ReactTraining/history/blob/v3/docs/GettingStarted.md#navigation
    //
    // For reference they are defined as follows:
    // push - Pushes a new location to history, becoming the current location.
    // replace - Replaces the current location in history.
    // go - Moves backwards or forwards a relative number of locations in history.
    // goForward - Moves forward one location. Equivalent to go(1)
    // goBack - Moves backwards one location. Equivalent to go(-1)
    //
    // Both push and replace take in a location descriptor, which can be an object describing the URL
    // or a plain string URL.
    //
    routerMiddleware(getHistory()),
  ].filter(elem => elem !== null) // remove null elements

export default generateMiddlewares
