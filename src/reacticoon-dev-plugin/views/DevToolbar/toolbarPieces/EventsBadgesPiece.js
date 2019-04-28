import React from 'react'

import { ReacticoonEvents, isSameEvent } from 'reacticoon/event'
import EventsContainer from '../../../modules/events/container'
import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import Piece from './Piece'

const styles = theme => ({
  badge: {
    paddingLeft: theme.spacing.unit,
    width: 50,
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
      const warnings = events.filter(event => isSameEvent(event, ReacticoonEvents.LOG_WARN))
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
            <div className={classes.badge}>
              <Badge
                badgeContent={warnings.length}
                color="secondary"
                classes={{ badge: classes.warning }}
              />
            </div>
            <div className={classes.badge}>
              <Badge
                badgeContent={errors.length}
                color="primary"
                classes={{ badge: classes.error }}
              />
            </div>
          </Piece.Header>
        </Piece>
      )
    }}
  </EventsContainer>
)

export default withStyles(styles)(EventsBadgesPiece)
