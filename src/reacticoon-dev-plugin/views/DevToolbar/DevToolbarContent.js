import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import { Link } from 'reacticoon/routing'
import SettingsIcon from '@material-ui/icons/Settings'
import ReacticoonLogo from '../../pages/components/svg/ReacticoonLogo'

const styles = theme => ({
  root: {
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
    zIndex: 999999,
  },
  rootSmall: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    height: 50,
    padding: theme.spacing.unit,
    display: 'flex',
    background: theme.app.colors.dark,
    color: 'white',
  },
  leftPart: {
    display: 'flex',
  },
  centerPart: {
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

const DevToolbarContent = ({ route, routeName, show, classes, onToggle, onToggleDetail }) =>
  !show ? (
    <div className={classes.rootSmall}>
      <div className={classes.logoArea} onClick={onToggle}>
        <ReacticoonLogo height={36} />
      </div>
    </div>
  ) : (
    <div className={classes.root}>
      <div className={classes.leftPart}>
        <Link to={Link.getRoute('REACTICOON_DASHBOARD')} newTab>
          <SettingsIcon />
        </Link>
        <div />
      </div>
      <div className={classes.centerPart} onClick={onToggleDetail}>
        {routeName}
      </div>
      <div className={classes.rightPart}>
        <div className={classes.logoArea} onClick={onToggle}>
          <ReacticoonLogo height={36} />
        </div>
      </div>
    </div>
  )

export default withStyles(styles)(DevToolbarContent)
