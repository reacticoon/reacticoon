import React from 'react'

import { getStore } from 'reacticoon/store'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class SelectorRunner extends React.Component {
  constructor(props) {
    super(props)

    const { selectorName, selector } = props.selectorData

    let selectorMethod = selector
    // handle make* selector. TODO: enforce this on documentation
    let isMakeSelector = selectorName.startsWith('make')
    if (isMakeSelector) {
      selectorMethod = selector()
      // TODO: verify selectorMethod is a function
    }

    this.state = {
      selectorMethod,
      isMakeSelector,
      // TODO: remove after tests
      propsJson: '{ "circleId": "1" }', //null,

      // result of the selector
      data: null,
    }
  }

  handlePropsJsonChange = propsJson => {
    this.setState({
      propsJson,
    })
  }

  run = () => {
    const { selectorMethod, propsJson } = this.state

    const data = selectorMethod(getStore().getState(), propsJson ? JSON.parse(propsJson) : null)

    this.setState({
      data,
    })
  }

  render() {
    const { selectorData } = this.props
    const { isMakeSelector, data } = this.state

    return (
      <div>
        {selectorData.selectorName}

        {/* Will receive props */}
        {isMakeSelector && (
          <div>
            <TextField
              label="Props"
              multiline
              value={this.state.propsJson}
              onChange={e => this.handlePropsJsonChange(e.target.value)}
              //className={classes.textField}
              margin="normal"
              helperText=""
              variant="outlined"
            />
          </div>
        )}

        <Button onClick={this.run}>Run</Button>

        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  }
}

export default SelectorRunner
