import React from 'react'

import { StateContainer } from 'reacticoon/view'
import EventsDebugger from '../../../EventsDebugger'

import Grid from '@material-ui/core/Grid'
import ReacticoonEventRunner from './ReacticoonEventRunner'
import Event from './Event'
import EventDetail from './EventDetail'

const ReacticoonEventsView = () => (
  <StateContainer defaultState={{ selectedEvent: null }}>
    {({ state, setState }) => (
      <Grid container>
        <Grid item xs={12}>
          <ReacticoonEventRunner />
        </Grid>
        <Grid item xs={6}>
          {EventsDebugger.getEvents().map((event, index) => (
            <Event
              key={index}
              event={event}
              onClick={() =>
                setState({
                  selectedEvent: event,
                })
              }
            />
          ))}
        </Grid>
        <Grid item xs={6}>
          {state.selectedEvent && <EventDetail event={state.selectedEvent} />}
        </Grid>
      </Grid>
    )}
  </StateContainer>
)

export default ReacticoonEventsView
