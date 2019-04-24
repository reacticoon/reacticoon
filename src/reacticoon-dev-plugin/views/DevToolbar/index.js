import React from 'react'

import { getConfigForRoute, getRouteNameForRoute } from 'reacticoon/routing'
import DevToolsTheme from '../../pages/components/Page/DevToolsTheme'
import DevToolbarContent from './DevToolbarContent'
import DevToolbarDetail from './DevToolbarDetail'

class DevToolbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showBar: true,
      showDetail: true,
    }
  }

  toggleBar = () => {
    this.setState({
      showBar: !this.state.showBar,
    })
  }

  toggleDetail = () => {
    this.setState({
      showDetail: !this.state.showDetail,
    })
  }

  render() {
    const { routes, location, params } = this.props

    const route = getConfigForRoute(routes[1]).definition
    const routeName = getRouteNameForRoute({ definition: route })

    return (
      <DevToolsTheme>
        {this.state.showDetail ? (
          <DevToolbarDetail
            onToggle={this.toggleDetail}
            route={route}
            routeName={routeName}
            params={params}
            location={location}
          />
        ) : (
          <DevToolbarContent
            show={this.state.showBar}
            onToggle={this.toggleBar}
            onToggleDetail={this.toggleDetail}
            route={route}
            routeName={routeName}
            params={params}
            location={location}
          />
        )}
      </DevToolsTheme>
    )
  }
}

export default DevToolbar
