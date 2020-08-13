// https://github.com/davolokh/webpack-feature-flags-plugin
import React from 'react'

import useModule from './useModule'

/**
 * /!\ This HOC will not remove dead code since webpack does not handle it.
 */
const withModule = (
  moduleName,
  connectData,
  moduleLoader,
  FallbackComponent = <div />
) => ComposedComponent => {
  try {
    class WithModuleHOC extends React.Component {
      constructor(props) {
        super(props)

        this.state = {
          module: null,
        }

        moduleLoader().then(module => {
          useModule(module.default)
          this.setState({ module: module.default })
        })
      }

      render() {
        const module = this.state.module

        if (!module) {
          return React.cloneElement(FallbackComponent)
        }

        return React.createElement(
          module.connect.apply(null, connectData)(ComposedComponent),
          this.props
        )
      }
    }
    WithModuleHOC.displayName = `WithModuleHOC_${moduleName}`

    return WithModuleHOC
  } catch (e) {
    console.info(`Crash on withModule`)
    console.error(e)
  }
  return null
}

export default withModule
