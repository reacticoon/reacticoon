import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import ReacticoonLogo from '../../components/svg/ReacticoonLogo'
import EventsBadgesPiece from './toolbarPieces/EventsBadgesPiece'
import GitPiece from './toolbarPieces/GitPiece'
import DashboardPiece from './toolbarPieces/DashboardPiece'
import RoutePiece from './toolbarPieces/RoutePiece'
import ReacticoonLogoPiece from './toolbarPieces/ReacticoonLogoPiece'
import UserContextPiece from './toolbarPieces/UserContextPiece'

const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: theme.app.toolbar.height,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.app.toolbar.colors.background,
    color: 'white',
    alignItems: 'center',
    zIndex: 999999,
  },
  rootSmall: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    height: theme.app.toolbar.height,
    padding: theme.spacing.unit,
    display: 'flex',
    backgroundColor: theme.app.toolbar.colors.background,
    color: 'white',
  },
  leftPart: {
    display: 'flex',
    height: '100%',
  },
  centerPart: {
    cursor: 'pointer',
    flexGrow: 1,
    textAlign: 'center',
    height: '100%',
  },
  rightPart: {
    display: 'flex',
    height: '100%',
  },
})

const Toolbar = ({ route, routeName, show, classes, onToggle, onToggleDetail }) =>
  !show ? (
    <div className={classes.rootSmall}>
      <div className={classes.logoArea} onClick={onToggle}>
        <ReacticoonLogo height={36} />
      </div>
    </div>
  ) : (
    <div className={classes.root}>
      <div className={classes.leftPart}>
        <DashboardPiece />

        <RoutePiece routeName={routeName} route={route} />

        <EventsBadgesPiece />
      </div>
      <div className={classes.centerPart} onClick={onToggleDetail} />
      <div className={classes.rightPart}>
        <UserContextPiece />

        <GitPiece />

        <ReacticoonLogoPiece onClick={onToggle} />
      </div>
    </div>
  )

export default withStyles(styles)(Toolbar)
