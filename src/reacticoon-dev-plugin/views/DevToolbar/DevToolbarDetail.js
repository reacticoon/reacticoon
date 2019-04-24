import React from 'react'

import { getReactVersion, getReactVersionDocLink } from 'reacticoon/environment'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'reacticoon/routing'
import SettingsIcon from '@material-ui/icons/Settings'
import ReacticoonLogo from '../../pages/components/svg/ReacticoonLogo'
import DevToolbarDetailRequestInfo from './DevToolbarDetailRequestInfo'
import DevToolbarStoreInfo from './DevToolbarStoreInfo'
import DevToolbarActions from './DevToolbarActions'

const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: 50,
    left: 0,
    right: 0,
    top: 0,
    padding: theme.spacing.unit,
    display: 'flex',
    background: 'white',
    zIndex: 9999999,
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
  },
  bottom: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    padding: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.app.colors.dark,
    color: 'white',
    alignItems: 'center',
  },
  leftPart: {
    display: 'flex',
  },
  centerArea: {
    cursor: 'pointer',
    width: 200,
    textAlign: 'center',
  },
  rightPart: {},
  logoArea: {
    float: 'right',
    cursor: 'pointer',
  },
})

const DevToolbarDetail = ({ route, routeName, params, classes, onToggle }) => (
  <div className={classes.root}>
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
      <div>
        {/* PARAMS */}
        <DevToolbarDetailRequestInfo route={route} params={params} />
      </div>

      <div>
        <DevToolbarActions />
      </div>

      <div>
        <DevToolbarStoreInfo />
      </div>
    </div>

    {/* BOTTOM */}
    <div className={classes.bottom}>
      <div className={classes.leftPart}>
        <Link to={Link.getRoute('REACTICOON_DASHBOARD')} newTab>
          <SettingsIcon />
        </Link>
        <div />
      </div>
      <div className={classes.centerArea} onClick={onToggle}>
        {routeName}
      </div>
      <div className={classes.rightPart}>
        <div className={classes.logoArea} onClick={onToggle}>
          <ReacticoonLogo height={36} />
        </div>
      </div>
    </div>
  </div>
)

export default withStyles(styles)(DevToolbarDetail)
