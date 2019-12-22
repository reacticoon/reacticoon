import React, { Component } from 'react'

import { DevToolbarRoute } from './constants'
import ReacticoonDevToolbarModule from './index'

class DevToolbarContainer extends Component {
  render() {
    const { children, ...otherProps } = this.props

    return children({
      ...otherProps,
      DevToolbarRoute,
    })
  }
}

export default ReacticoonDevToolbarModule.connect(
  DevToolbarContainer,
  {
    route: 'getRoute',
  },
  'displayDevToolbarRoute'
)
