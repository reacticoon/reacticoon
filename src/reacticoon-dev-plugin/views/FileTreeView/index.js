import React from 'react'
import startsWith from 'lodash/startsWith'

import { StateContainer } from 'reacticoon/view'
import Grid from '@material-ui/core/Grid'
import Finderjs from 'reacticoon/reacticoon-dev-plugin/views/Finderjs'
import CommandContainer from 'reacticoon/reacticoon-dev-plugin/modules/command/view/CommandContainer'
import JsonView from '../../components/JsonView'
// import JsonView from 'reacticoon/reacticoon-dev-plugin/components/JsonView'

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

const renderData = ({ data }) => {
  // try to display file content as json
  if (startsWith(data.trim(), '{')) {
    try {
      const json = JSON.parse(data)
      return <JsonView json={json} />
    } catch (e) {}
  }
  return <pre>{data}</pre>
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
                      {renderData}
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
