import React from 'react'

import { StateContainer } from 'reacticoon/view'
import { ReacticoonEvents, isSameEvent } from 'reacticoon/event'

import EventsContainer from '../../../modules/events/container'
import Grid from '@material-ui/core/Grid'

import Deprecation from './Deprecation'
import Warning from './Warning'
import ErrorView from './Error'

const LogsView = () => (
  <StateContainer defaultState={{ selectedEvent: null }}>
    {({ state, setState }) => (
      <Grid container>
        <Grid item xs={6}>
          <EventsContainer>
            {({ events }) => {
              // TODO: filter duplicates
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
                <Grid container>
                  <Grid item xs={12}>
                    {errors.map((error, index) => (
                      <ErrorView key={index} error={error} />
                    ))}
                  </Grid>
                  <Grid item xs={12}>
                    {warnings.map((warning, index) => (
                      <Warning key={index} warning={warning} />
                    ))}
                  </Grid>
                  <Grid item xs={12}>
                    {deprecations.map((deprecation, index) => (
                      <Deprecation key={index} deprecation={deprecation} />
                    ))}
                  </Grid>
                </Grid>
              )
            }}
          </EventsContainer>
        </Grid>
        <Grid item xs={6}>
          {/* {state.selectedEvent && <EventDetail event={state.selectedEvent} />} */}
        </Grid>
      </Grid>
    )}
  </StateContainer>
)

export default LogsView
