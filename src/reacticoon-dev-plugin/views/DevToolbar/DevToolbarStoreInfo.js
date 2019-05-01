import React from 'react'

import get from 'lodash/get'

import { getStore } from 'reacticoon/store'
import { StateContainer } from 'reacticoon/view'

import JsonView from 'reacticoon/reacticoon-dev-plugin/components/JsonView'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const DevToolbarStoreInfo = () => (
  <Grid container>
    <Grid item xs={6}>
      <pre style={{ overflow: 'scroll', height: '80vh', width: '40vw' }}>
        <JsonView json={getStore().getState()} />
      </pre>
    </Grid>

    <Grid item xs={6}>
      <StateContainer defaultState={{ input: `App::CircleModule`, followed: [] }}>
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

                  <JsonView json={get(getStore().getState(), follow.path)} />
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
