import React from 'react'

import RoutingDebugger from '../../RoutingDebugger'
import { getConfigForRoute, getRouteNameForRoute } from 'reacticoon/routing'
import DevToolsTheme from '../../pages/components/Page/DevToolsTheme'
import DevToolbarContent from './DevToolbarContent'
import DevToolbarDetail from './DevToolbarDetail'

class DevToolbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showBar: true,
      // can be null, true or false. null: we do not rendre, false: we only hide,
      // to avoid resetting the state and allow going on and back.
      showDetail: false, // null,
    }

    this.updateRoutingDebugger(props)
  }

  componentDidUpdate(props) {
    this.updateRoutingDebugger(props)
  }

  updateRoutingDebugger(props) {
    const { routes, location, params } = props

    const route = getConfigForRoute(routes[1]).definition
    const routeName = getRouteNameForRoute({ definition: route })

    RoutingDebugger.setCurrentRoute(route)
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
        {this.state.showDetail !== null && (
          <DevToolbarDetail
            show={this.state.showDetail}
            onToggle={this.toggleDetail}
            route={route}
            routeName={routeName}
            params={params}
            location={location}
          />
        )}

        {!this.state.showDetail && (
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
