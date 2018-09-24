
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
  return {
    name,
    content,
  }
}

export default createModule
