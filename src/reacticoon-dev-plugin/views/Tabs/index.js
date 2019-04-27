import React from 'react'

import { StateContainer } from 'reacticoon/view'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

class ReacticoonTabs extends React.Component {
  render() {
    return (
      <StateContainer defaultState={{ tab: this.props.defaultTab || 0 }}>
        {({ state, setState }) => (
          <React.Fragment>
            <AppBar
              position="static"
              color="default"
              position="sticky"
              classes={this.props.appBarClasses}
            >
              <Tabs
                value={state.tab}
                onChange={(e, value) => {
                  setState({ tab: value })
                }}
              >
                {this.props.tabs.map((tabInfo, index) => (
                  <Tab key={index} label={tabInfo.label} />
                ))}
              </Tabs>
            </AppBar>

            <Typography component="div" style={{ padding: 8 * 3 }}>
              {this.props.content.map((tabContent, index) => (
                // only hide not current tab, since we do not want to reset the tab state when switching tabs
                <div key={index} style={{ display: index !== state.tab ? 'none' : 'block' }}>
                  {tabContent}
                </div>
              ))}
            </Typography>
          </React.Fragment>
        )}
      </StateContainer>
    )
  }
}

export default ReacticoonTabs
