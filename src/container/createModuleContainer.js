import React from 'react'

import isFunction from 'lodash/isFunction'

/**
 *
 * @param options
 *  - module
 */
function createModuleContainer(containerName, Module, options) {
  const { mapChildrenProps, selectors, actions } = options
  class ModuleContainer extends React.Component {
    render() {
      const { children, ...otherProps } = this.props

      let childrenProps = otherProps
      if (isFunction(mapChildrenProps)) {
        childrenProps = mapChildrenProps(childrenProps)
      }

      return children(childrenProps)
    }
  }

  ModuleContainer.displayName = containerName

  ModuleContainer.propTypes = {}

  return Module.connect(selectors, actions)(ModuleContainer)
}

export default createModuleContainer
