import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'reacticoon/view'
import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'

/**
 *
 * @param options
 *  - module
 */
function createModuleContainer(containerName, Module, options) {
  try {
    const { mapChildrenProps, selectors, actions } = options
    class ModuleContainer extends React.Component {
      constructor(props) {
        super(props)
      }

      render() {
        const { children, ...otherProps } = this.props

        let childrenProps = otherProps
        if (isFunction(mapChildrenProps)) {
          childrenProps = mapChildrenProps(childrenProps)
        }

        return children(otherProps)
      }
    }

    ModuleContainer.displayName = containerName

    ModuleContainer.propTypes = {}

    return Module.connect(ModuleContainer, selectors, actions)
  } catch (e) {
    console.error(e)
    debugger
  }
}

export default createModuleContainer
