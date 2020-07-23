import isNil from 'lodash/isNil'
import invariant from 'invariant'
import isArray from 'lodash/isArray'
import forEach from 'lodash/forEach'
import get from 'lodash/get'

import { isMakeSelector } from 'reacticoon/selector/utils'
import { connect } from 'reacticoon/view'

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
 *   // TODO: use noReducer instead of reducer null on generateModuleEntities
 *   noReducer: true, // if you explicitely do not want a reducer, or use reducer: null
 *   actions,
 *   reducer: bookmarkReducer,
 *   selectors,
 * })
 *
 * export default bookmarkModule
 * ```
 */
const createModule = (moduleName, content) => {

  const getSubModules = () => {
    return content.subModules || []
  }
  
  const getAction = actionName => {
    const action = content.actions[actionName]

    invariant(!isNil(action), `Module ${moduleName}, action not found: ${actionName}`)

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
    const selector = get(content.selectors, selectorName)

    invariant(!isNil(selector), `Module ${moduleName}, selector not found: ${selectorName}`)

    return selector
  }

  const getOptionalSelector = selectorName => {
    const selector = get(content.selectors, selectorName)
    return selector || (() => null)
  }

  /**
   * Generates the mapStateToProps. Handles make selector too. (makeMapStateToProps).
   *
   * @param selectorNames object of value name and selector name.
   * <pre>
   * {
   *    data: 'getData',
   *    isPending: 'makeisPending'
   * }
   * </pre>
   */
  const getMapStateToProps = selectorsNames => {
    let hasAMakeSelector = false

    forEach(selectorsNames, (selectorName, valueName) => {
      const selector = getSelector(selectorName)
      if (isMakeSelector(selectorName, selector)) {
        hasAMakeSelector = true
        return false // quit loop
      }
    })

    const createMapStateToProps = () => {
      const selectorsMap = {}
      forEach(selectorsNames, (selectorName, valueName) => {
        const selector = getSelector(selectorName)

        if (isMakeSelector(selectorName, selector)) {
          selectorsMap[valueName] = selector()
        } else {
          selectorsMap[valueName] = selector
        }
      })

      const mapStateToProps = (state, ownProps) => {
        const data = {}
        forEach(selectorsMap, (selector, valueName) => {
          data[valueName] = selector(state, ownProps)
        })
        return data
      }
      return mapStateToProps
    }

    if (hasAMakeSelector) {
      return () => createMapStateToProps()
    } else {
      return createMapStateToProps()
    }
  }

  /**
   * Connect to our module
   *
   * <pre>
   * MyModule.connect(
   *    MyContainer,
   *   {
   *     isPending: 'makeisPending',
   *     data: 'makeGetData',
   *   },
   *   'fetchData',
   *   {
   *     defaultProps: {}
   *   }
   * )(MyContainer)
   * </pre>
   */
  const connectModule = (mapStateToProps, actionsParam, options = {}) => container => {
    const actions = isArray(actionsParam) ? actionsParam : [actionsParam]

    const connected = connect(
      getMapStateToProps(mapStateToProps),
      getActionsMap.apply(null, actions)
    )(container)

    // TODO: which other options could we have ?
    // should we spread the options ?
    if (options.defaultProps) {
      connected.defaultProps = options.defaultProps
    }

    const displayName = `${connected.displayName} (${moduleName})`
    connected.displayName = displayName

    return connected
  }

  return {
    name: moduleName,
    content,
    getAction,
    getSelector,
    getOptionalSelector,
    getActionsMap,
    getMapStateToProps,
    connect: connectModule,
    getSubModules,
    __IS_MODULE: true,
  }
}

export default createModule
