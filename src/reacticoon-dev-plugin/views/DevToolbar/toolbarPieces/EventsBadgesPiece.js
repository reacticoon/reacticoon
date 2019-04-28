import React from 'react'

import { ReacticoonEvents, isSameEvent } from 'reacticoon/event'
import EventsContainer from '../../../modules/events/container'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import Piece from './Piece'

const styles = theme => ({
  badge: {
    width: '28px',
    height: '28px',
    marginLeft: '8px',
    borderRadius: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  warning: {
    backgroundColor: theme.app.colors.warn,
  },
  error: {
    backgroundColor: theme.app.colors.error,
  },
})

const EventsBadgesPiece = ({ classes }) => (
  <EventsContainer>
    {({ events }) => {
      const warnings = events.filter(
        event =>
          isSameEvent(event, ReacticoonEvents.LOG_WARN) ||
          isSameEvent(event, ReacticoonEvents.LOG_DEPRECATION)
      )
      const errors = events.filter(
        event =>
          isSameEvent(event, ReacticoonEvents.LOG_ERROR) ||
          isSameEvent(event, ReacticoonEvents.LOG_EXCEPTION) ||
          isSameEvent(event, ReacticoonEvents.LOG_REDUX_EXCEPTION) ||
          isSameEvent(event, ReacticoonEvents.LOG_COMPONENT_DID_CATCH) ||
          isSameEvent(event, ReacticoonEvents.LOG_NOT_IMPLEMENTED)
      )
      return (
        <Piece name="EventsBadges" headerStyle={{ textAlign: 'center' }}>
          <Piece.Header>
            <div className={classNames(classes.badge, classes.warning)}>{warnings.length}</div>
            <div className={classNames(classes.badge, classes.error)}>{errors.length}</div>
          </Piece.Header>
        </Piece>
      )
    }}
  </EventsContainer>
)

export default withStyles(styles)(EventsBadgesPiece)
