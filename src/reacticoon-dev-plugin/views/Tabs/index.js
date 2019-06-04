import React from 'react'

import { StateContainer } from 'reacticoon/view'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

// https://codesandbox.io/s/n9ww0pq7p4
const VerticalTabs = withStyles(theme => ({
  root: {
    background: theme.app.colors.dark,
  },
  flexContainer: {
    flexDirection: 'column',
  },
  indicator: {
    display: 'none',
  },
}))(Tabs)

const VerticalTab = withStyles(theme => ({
  root: {
    color: 'white',
    textAlign: 'left',
  },
  selected: {
    color: 'tomato',
    borderRight: '2px solid tomato',
  },
}))(Tab)

class ReacticoonTabs extends React.Component {
  render() {
    const { vertical } = this.props

    const TabsView = vertical ? VerticalTabs : Tabs
    const TabView = vertical ? VerticalTab : Tab

    return (
      <StateContainer
        defaultState={{
          tab: this.props.defaultTab || 0,
          renderedTabs: { [this.props.defaultTab]: true },
        }}
      >
        {({ state, setState }) => (
          <React.Fragment>
            <TabsView
              value={state.tab}
              onChange={(e, value) => {
                setState({ tab: value, renderedTabs: { ...state.renderedTabs, [value]: true } })
              }}
              classes={this.props.tabsViewClasses}
            >
              {this.props.tabs.map((tabInfo, index) => (
                <TabView key={index} label={tabInfo.label} />
              ))}
            </TabsView>

            <Typography component="div" style={{ padding: 8 * 3 }}>
              {this.props.content.map((tabContent, index) =>
                // optimisation: we render onlythe tab that alreay had been render. allows to keep
                // tab content if visited, but increase perfs to not render all the tabs contents
                !state.renderedTabs[state.tab] ? null : (
                  // only hide not current tab, since we do not want to reset the tab state when switching tabs
                  <div key={index} style={{ display: index !== state.tab ? 'none' : 'block' }}>
                    {tabContent}
                  </div>
                )
              )}
            </Typography>
          </React.Fragment>
        )}
      </StateContainer>
    )
  }
}

export default ReacticoonTabs
