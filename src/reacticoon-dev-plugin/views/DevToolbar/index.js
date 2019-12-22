import React from 'react'

import DevToolbarContainer from '../../modules/devToolBar/container'
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

  toggleBar = route => {
    this.setState({
      showBar: !this.state.showBar,
    })
  }

  render() {
    const { route, location, params } = this.props

    const routeName = getRouteNameForRoute({ definition: route })

    return (
      <DevToolbarContainer>
        {({ route: devToolbarRoute, displayDevToolbarRoute, DevToolbarRoute }) => {
          return (
            <DevToolsTheme>
              {devToolbarRoute !== null && (
                <DevToolbarDetail
                  show={devToolbarRoute !== null}
                  devToolbarRoute={devToolbarRoute}
                  onToggle={devToolbarRoute => {
                    if (devToolbarRoute) {
                      displayDevToolbarRoute(null)
                    } else {
                      displayDevToolbarRoute(devToolbarRoute)
                    }
                  }}
                  route={route}
                  routeName={routeName}
                  params={params}
                  location={location}
                  extendedTabs={this.extendedTabs}
                />
              )}

              <Toolbar
                show={this.state.showBar}
                onToggle={this.toggleBar}
                onToggleDetail={() => {
                  if (devToolbarRoute) {
                    displayDevToolbarRoute(null)
                  } else {
                    displayDevToolbarRoute(DevToolbarRoute.events)
                  }
                }}
                route={route}
                routeName={routeName}
                params={params}
                location={location}
              />
            </DevToolsTheme>
          )
        }}
      </DevToolbarContainer>
    )
  }
}

export default DevToolbar
