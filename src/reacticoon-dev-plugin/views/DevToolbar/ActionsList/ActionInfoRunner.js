import React from 'react'

import { getStore } from 'reacticoon/store'
import map from 'lodash/map'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

class Runner extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      parametersData: [],
    }
  }

  handleParameterChange = (parameter, index, value) => {
    const { parametersData } = this.state

    parametersData[index] = value

    this.setState({
      parametersData,
    })
  }

  dispatch = () => {
    const { action } = this.props
    const { parametersData } = this.state

    getStore().dispatch(action.apply(null, parametersData))
  }

  render() {
    const { action } = this.props
    const { parametersData } = this.state

    let info = []
    let content = <div />
    switch (action.TYPE) {
      case 'API::API_CALL': // TODO: constant
        info = [
          {
            label: 'Type',
            value: `API_CALL: ${action.__type}`,
          },
        ]
        break

      default:
    }

    const parameters = action.__parameters || []

    return (
      <div>
        <div>
          {map(info, (infoData, index) => (
            <div key={index}>
              {infoData.label} {infoData.value}
            </div>
          ))}
        </div>

        <div>{content}</div>

        <div>
          <Typography>Parameters</Typography>
          {parameters.map((parameter, index) => (
            <div key={index}>
              <TextField
                id={`param_${index}`}
                label={parameter}
                multiline
                value={parametersData[index]}
                onChange={e => this.handleParameterChange(parameter, index, e.target.value)}
                //className={classes.textField}
                margin="normal"
                helperText=""
                variant="outlined"
              />
            </div>
          ))}
        </div>

        <Button onClick={this.dispatch}>Dispatch</Button>
      </div>
    )
  }
}

const ActionInfoRunner = ({ actionData }) => {
  return (
    <div>
      {actionData.actionName}

      <div>
        <Runner action={actionData.action} />
      </div>
    </div>
  )
}

export default ActionInfoRunner
