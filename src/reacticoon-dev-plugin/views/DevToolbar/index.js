import React from 'react'

import RoutingDebugger from '../../RoutingDebugger'
import { getRouteNameForRoute } from 'reacticoon/routing'
import { getExtendedTabs } from '../../utils'
import DevToolsTheme from '../../components/Page/DevToolsTheme'
import DevToolbarDetail from './DevToolbarDetail'
import Toolbar from './Toolbar'

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

    this.extendedTabs = getExtendedTabs()
  }

  componentDidUpdate(props) {
    this.updateRoutingDebugger(props)
  }

  updateRoutingDebugger(props) {
    const { route, location, params } = props

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
    const { route, location, params } = this.props

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
            extendedTabs={this.extendedTabs}
          />
        )}

        {!this.state.showDetail && (
          <Toolbar
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
