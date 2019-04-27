import isNil from 'lodash/isNil'
import startsWith from 'lodash/startsWith'
import invariant from 'invariant'
import isArray from 'lodash/isArray'
import forEach from 'lodash/forEach'

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

  /**
   * Generates the mapStateToProps. Handles make selector too. (makeMapStateToProps).
   *
   * @param selectorNames object of value name and selector name.
   * <pre>
   * {
   *    data: 'getData',
   *    isFetching: 'makeIsFetching'
   * }
   * </pre>
   */
  const getMapStateToProps = selectorsNames => {
    let isMake = false
    forEach(selectorsNames, selectorName => {
      if (startsWith(selectorName, 'make')) {
        isMake = true
        return false // quit loop
      }
    })

    const createMapStateToProps = () => {
      const selectorsMap = {}
      forEach(selectorsNames, (selectorName, valueName) => {
        const selector = getSelector(selectorName)
        if (startsWith(selectorName, 'make')) {
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

    if (isMake) {
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
   *     isFetching: 'makeIsFetching',
   *     data: 'makeGetData',
   *   },
   *   'fetchData',
   *   {
   *     defaultProps: {}
   *   }
   * )(MyContainer)
   * </pre>
   */
  const connectModule = (container, mapStateToProps, actionsParam, options = {}) => {
    const actions = isArray(actionsParam) ? actionsParam : [actionsParam]

    const connected = connect(
      getMapStateToProps(mapStateToProps),
      getActionsMap.apply(null, actions)
    )(container)

    if (options.defaultProps) {
      connected.defaultProps = options.defaultProps
    }

    return connected
  }

  return {
    name,
    content,
    getAction,
    getSelector,
    getActionsMap,
    getMapStateToProps,
    connect: connectModule,
  }
}

export default createModule
