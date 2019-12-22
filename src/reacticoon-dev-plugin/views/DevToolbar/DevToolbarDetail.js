import React from 'react'

import { findIndexOnArray } from 'reacticoon/utils/array'

import { DevToolbarRoute } from '../../modules/devToolBar'
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
import ModulesList from './ModulesList'
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
    paddingRight: theme.spacing.unit,
    display: 'flex',
    background: 'white',
    zIndex: 1300,
    overflowY: 'auto',
  },
  rootHide: {
    display: 'none',
  },
  header: {
    background: theme.app.colors.dark,
    height: 50,
    position: 'fixed',
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
    alignitems: 'center',
  },
  content: {
    width: '100%',
    display: 'flex',
    paddingTop: theme.app.toolbar.header.height + 10,
    paddingLeft: 240 + theme.spacing.unit * 2,
    paddingBottom: 54,
  },
  tabsView_root: {
    width: 240,
    position: 'fixed',
    top: theme.app.toolbar.header.height,
    bottom: 0,
    left: 0,
    paddingTop: theme.spacing.unit * 2,
  },
  tabsView_content: {},
})

const DevToolbarDetail = ({
  show,
  route,
  routeName,
  params,
  devToolbarRoute,
  classes,
  extendedTabs,
  onToggle,
}) => {
  const tabs = [
    {
      id: DevToolbarRoute.infos,
      label: 'Infos',
    },
    {
      id: DevToolbarRoute.modules,
      label: 'Modules',
    },
    {
      id: DevToolbarRoute.performances,
      label: 'Performances',
    },
    {
      id: DevToolbarRoute.actions,
      label: 'Actions & selectors',
    },
    {
      id: DevToolbarRoute.store,
      label: 'Store',
    },
    {
      id: DevToolbarRoute.events,
      label: 'Reacticoon events',
    },
    {
      id: DevToolbarRoute.logs,
      label: 'Logs',
    },
  ].concat(extendedTabs.map(tab => ({ label: tab.label })))

  let defaultTab = findIndexOnArray(tabs, tab => tab.id === devToolbarRoute)

  if (defaultTab === -1) {
    defaultTab = 0
  }

  return (
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
          vertical
          defaultTab={defaultTab}
          tabsViewClasses={{ root: classes.tabsView_root, content: classes.tabsView_content }}
          tabs={tabs.map(tab => ({
            label: tab.label,
          }))}
          content={[
            // 0
            <DevToolbarDetailRequestInfo route={route} params={params} />,
            <ModulesList />,
            <Performance />,
            //
            <Grid container>
              <Grid item xs={6}>
                <DevToolbarActions />
              </Grid>

              <Grid item xs={6}>
                <SelectorsList />
              </Grid>
            </Grid>,
            //
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
}

export default withStyles(styles)(DevToolbarDetail)
