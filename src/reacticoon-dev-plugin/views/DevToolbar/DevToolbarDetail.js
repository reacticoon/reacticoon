import React from 'react'

import { getReactVersion, getReactVersionDocLink } from 'reacticoon/environment'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ReacticoonLogo from '../../components/svg/ReacticoonLogo'
import Tabs from '../../views/Tabs'
import DevToolbarDetailRequestInfo from './DevToolbarDetailRequestInfo'
import DevToolbarStoreInfo from './DevToolbarStoreInfo'
import DevToolbarActions from './DevToolbarActions'
import SelectorsList from './SelectorsList'
import ReacticoonEventsView from './ReacticoonEventsView'
import LogsView from './Logs'
import Performance from './Performance'
import Toolbar from './Toolbar'

const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: theme.app.toolbar.height,
    left: 0,
    right: 0,
    top: 0,
    padding: theme.spacing.unit,
    display: 'flex',
    background: 'white',
    zIndex: 1300,
    overflowY: 'auto',
  },
  rootHide: {
    display: 'none',
  },
  tabs_appBar_root: {
    marginTop: -12,
  },
  header: {
    background: theme.app.colors.dark,
    height: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
  headerBrand: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    paddingTop: 54,
    paddingBottom: 54,
    width: '100%',
  },
})

const DevToolbarDetail = ({ show, route, routeName, params, classes, extendedTabs, onToggle }) => (
  <div
    className={classNames(classes.root, {
      [classes.rootHide]: !show,
    })}
  >
    <div className={classes.header}>
      <div className={classes.headerBrand}>
        <ReacticoonLogo height={36} />
        &nbsp;&nbsp;
        <h2>Reacticoon Dev Tools Debugger</h2>
      </div>

      {/* TODO: link to reacticoon doc / react  */}
      <div>
        <a href={getReactVersionDocLink()} target="_blank">
          {getReactVersion()}
        </a>
      </div>
    </div>

    <div className={classes.content}>
      <Tabs
        defaultTab={3}
        appBarClasses={{ root: classes.tabs_appBar_root }}
        tabs={[
          {
            label: 'Infos',
          },
          {
            label: 'Performances',
          },
          {
            label: 'Actions & selectors',
          },
          {
            label: 'Store',
          },
          {
            label: 'Reacticoon events',
          },
          {
            label: 'Logs',
          },
        ].concat(extendedTabs.map(tab => ({ label: tab.label })))}
        content={[
          // 0
          <DevToolbarDetailRequestInfo route={route} params={params} />,
          <Performance />,
          // 1
          <Grid container>
            <Grid item xs={6}>
              <DevToolbarActions />
            </Grid>

            <Grid item xs={6}>
              <SelectorsList />
            </Grid>
          </Grid>,
          // 2
          <DevToolbarStoreInfo />,
          <ReacticoonEventsView />,
          <LogsView />,
        ].concat(extendedTabs.map(tab => React.createElement(tab.view)))}
      />
    </div>

    {/* BOTTOM */}
    <Toolbar
      show
      route={route}
      routeName={routeName}
      onToggle={onToggle}
      onToggleDetail={onToggle}
    />
  </div>
)

export default withStyles(styles)(DevToolbarDetail)
