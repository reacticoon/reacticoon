import React from 'react'

import get from 'lodash/get'

import { getStore } from 'reacticoon/store'
import { StateContainer } from 'reacticoon/view'
// TODO: fix with lib
// https://github.com/mac-s-g/react-json-view
// import ReactJson from 'react-json-view'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const DevToolbarStoreInfo = () => (
  <Grid container>
    <Grid item xs={6}>
      <pre style={{ overflow: 'scroll', height: '80vh', width: '40vw' }}>
        {JSON.stringify(getStore().getState(), null, 2)}
      </pre>
      {/* <ReactJson theme="monokai" src={{ test: 42 }} /> */}
      {/* <ReactJson src={JSON.stringify(getStore().getState())} /> */}
    </Grid>

    <Grid item xs={6}>
      <StateContainer defaultState={{ input: `entities["App::CircleModule"]`, followed: [] }}>
        {({ state, setState }) => (
          <div>
            <TextField value={state.input} onChange={e => setState({ input: e.target.value })} />

            <Button
              onClick={() =>
                setState({
                  followed: [
                    ...state.followed,
                    {
                      path: state.input,
                    },
                  ],
                })
              }
            >
              Follow this path
            </Button>

            <div>
              {state.followed.map(follow => (
                <div>
                  <div>{follow.path}</div>

                  <pre>{JSON.stringify(get(getStore().getState(), follow.path), null, 2)}</pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </StateContainer>
    </Grid>
  </Grid>
)

export default DevToolbarStoreInfo
