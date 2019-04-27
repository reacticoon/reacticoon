import React from 'react'

import { StateContainer } from 'reacticoon/view'
import Grid from '@material-ui/core/Grid'
import MockDebugger from '../../MockDebugger'
import MockedCall from './MockedCall'
import MockedCallDetail from './MockedCallDetail'

const DevPluginToolbarTab = () => (
  <StateContainer defaultState={{ selectedEvent: null }}>
    {({ state, setState }) => (
      <Grid container>
        <Grid item xs={6}>
          {MockDebugger.getFormattedMockedCalls().map((mockedCall, index) => (
            <MockedCall
              key={index}
              mockedCall={mockedCall}
              onClick={() =>
                setState({
                  selectedMockedCall: mockedCall,
                })
              }
            />
          ))}
        </Grid>
        <Grid item xs={6}>
          {state.selectedMockedCall && <MockedCallDetail mockedCall={state.selectedMockedCall} />}
        </Grid>
      </Grid>
    )}
  </StateContainer>
)

export default DevPluginToolbarTab
