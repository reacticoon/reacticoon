import React from 'react'

import { StateContainer } from 'reacticoon/view'
import Grid from '@material-ui/core/Grid'
import Finderjs from 'reacticoon/reacticoon-dev-plugin/views/Finderjs'
import CommandContainer from 'reacticoon/reacticoon-dev-plugin/modules/command/view/CommandContainer'

const getFinderData = data => {
  const transform = path => {
    return {
      id: path.filepath,
      label: path.name,
      children: (path.files || []).map(transform),
      isFile: path.isFile,
      filepath: path.filepath,
    }
  }

  return data.tree.map(transform)
}

const FileTreeView = ({ command, children }) => (
  <CommandContainer command={command}>
    {({ data }) => {
      const finderData = getFinderData(data)
      return (
        <StateContainer defaultState={{ selectedItem: null }}>
          {({ state, setState }) => (
            <Grid container>
              <Grid item md={6}>
                <Finderjs
                  data={finderData}
                  onItemSelected={item => {
                    if (item.isFile) {
                      setState({ selectedItem: item })
                    }
                    return true
                  }}
                />
              </Grid>
              <Grid item md={6}>
                {state.selectedItem && (
                  <React.Fragment>
                    {children && children({ item: state.selectedItem })}
                    <CommandContainer
                      command="READ_FILE"
                      id={state.selectedItem.filepath}
                      payload={{ filepath: state.selectedItem.filepath }}
                    >
                      {({ data }) => <pre>{data}</pre>}
                    </CommandContainer>
                  </React.Fragment>
                )}
              </Grid>
            </Grid>
          )}
        </StateContainer>
      )
    }}
  </CommandContainer>
)

export default FileTreeView
