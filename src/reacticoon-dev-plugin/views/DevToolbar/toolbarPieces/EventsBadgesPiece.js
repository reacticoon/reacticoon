import React from 'react'

import { ReacticoonEvents, isSameEvent } from 'reacticoon/event'
import EventsContainer from '../../../modules/events/container'
import DevToolbarContainer from '../../../modules/devToolBar/container'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import WarningIcon from '@material-ui/icons/Warning'
import Piece from './Piece'

const styles = theme => ({
  badge: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    // marginLeft: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // width: 50,
    height: '100%',
  },
  contentValue: {
    height: '100%',
    width: 20,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    color: 'white',
    backgroudColor: '#666',
  },
  warning: {
    backgroundColor: theme.app.colors.warn,
  },
  error: {
    backgroundColor: theme.app.colors.error,
  },
})

const EventsBadgesPiece = ({ classes }) => (
  <DevToolbarContainer>
    {({ displayDevToolbarRoute, DevToolbarRoute }) => (
      <EventsContainer>
        {({ events }) => {
          const warnings = events.filter(event => isSameEvent(event, ReacticoonEvents.LOG_WARN))

          const deprecations = events.filter(event =>
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

          const nbErrors = errors.length
          const nbWarnings = warnings.length
          const nbDeprecations = deprecations.length

          const nbTotal = nbErrors + nbWarnings + nbDeprecations

          const hasError = nbErrors > 0
          const hasWarning = nbWarnings > 0 || nbDeprecations > 0

          return (
            <Piece
              name="EventsBadges"
              headerStyle={{ textAlign: 'center' }}
              classes={{
                header: classNames({
                  [classes.warning]: hasWarning && !hasError,
                  [classes.error]: hasError,
                }),
              }}
            >
              <Piece.Header>
                <div className={classes.badge}>
                  <WarningIcon />
                  &nbsp;
                  {nbTotal}
                </div>
              </Piece.Header>

              <Piece.Content>
                {() => [
                  {
                    label: 'Errors',
                    onClick: () => displayDevToolbarRoute(DevToolbarRoute.events),
                    value: (
                      <span
                        className={classNames(classes.contentValue, {
                          [classes.error]: nbErrors > 1,
                        })}
                      >
                        {nbErrors}
                      </span>
                    ),
                  },
                  {
                    label: 'Warnings',
                    onClick: () => displayDevToolbarRoute(DevToolbarRoute.events),
                    value: (
                      <span
                        className={classNames(classes.contentValue, {
                          [classes.warning]: nbWarnings > 1,
                        })}
                      >
                        {nbWarnings}
                      </span>
                    ),
                  },
                  {
                    label: 'Deprecations',
                    onClick: () => displayDevToolbarRoute(DevToolbarRoute.events),
                    value: (
                      <span
                        className={classNames(classes.contentValue, {
                          [classes.warning]: nbDeprecations > 1,
                        })}
                      >
                        {nbDeprecations}
                      </span>
                    ),
                  },
                ]}
              </Piece.Content>
            </Piece>
          )
        }}
      </EventsContainer>
    )}
  </DevToolbarContainer>
)

export default withStyles(styles)(EventsBadgesPiece)
