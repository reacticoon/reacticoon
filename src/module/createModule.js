import isNil from 'lodash/isNil'
import invariant from 'invariant'

/**
 * 
 * @param {object} module contains:
 *  - actions
 *  - reducer
 *  - selectors
 * 
 * Example:
 * 
 * ```
 * import createModule from 'module/createModule'
 *  
 * import * as actions from './actions'
 * import * as selectors from './selectors'
 * import bookmarkReducer from './reducer'
 * 
 * const bookmarkModule = createModule('Bookmark', {
 *   actions,
 *   reducer: bookmarkReducer,
 *   selectors,
 * })
 * 
 * export default bookmarkModule
 * ```
 */
const createModule = (name, content) => {
  const getAction = actionName => {
    const action = content.actions[actionName]

    invariant(!isNil(action), `Module ${name}, action not found: ${actionName}`)

    return action
  }

  const getActionsMap = (...actionsNames) => {
    const actions = {}
    actionsNames.forEach(actionName => {
      actions[actionName] = getAction(actionName)
    })
    return actions
  }

  const getSelector = selectorName => {
    const selector = content.selectors[selectorName]

    invariant(!isNil(selector), `Module ${name}, selector not found: ${selectorName}`)

    return selector
  }

  return {
    name,
    content,
    getAction,
    getSelector,
    getActionsMap,
  }
}

export default createModule
