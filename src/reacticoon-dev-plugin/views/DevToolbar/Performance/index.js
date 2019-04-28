import React from 'react'

import { StateContainer } from 'reacticoon/view'
import { getEntries } from 'reacticoon/performance'
import Button from '@material-ui/core/Button'

const Performance = () => (
  <div>
    <StateContainer defaultState={{ data: null }}>
      {({ state, setState }) => (
        <div>
          <Button
            onClick={() => {
              setState({
                data: getEntries(),
              })
            }}
          >
            Display
          </Button>
          <pre>{state.data && JSON.stringify(state.data, null, 2)}</pre>
        </div>
      )}
    </StateContainer>
  </div>
)

export default Performance
