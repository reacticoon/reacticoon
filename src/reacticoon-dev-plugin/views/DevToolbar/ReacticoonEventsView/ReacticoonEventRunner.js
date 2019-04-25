import React from 'react'

import { EventManager } from 'reacticoon/event'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class ReacticoonEventRunner extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedEvent: null,
      //propsJson: null,
      propsJson: '{ "type": "test", "detail": "42" }',
    }
  }

  onSelectEvent = e => {
    this.setState({
      selectedEvent: e.target.value,
    })
  }

  handlePropsJsonChange = propsJson => {
    this.setState({
      propsJson,
    })
  }

  handleDispatch = () => {
    const { selectedEvent, propsJson } = this.state
    EventManager.dispatch(selectedEvent.definition, JSON.parse(propsJson))
  }

  renderEventContentForm() {
    const { selectedEvent, propsJson } = this.state
    if (!selectedEvent) {
      return null
    }
    switch (selectedEvent.definition.type) {
      case EventManager.Event.LOG_WARN.type:
      // return 'LOL'

      default:
        return (
          <TextField
            label="Props"
            multiline
            value={propsJson}
            onChange={e => this.handlePropsJsonChange(e.target.value)}
            //className={classes.textField}
            margin="normal"
            helperText=""
            variant="outlined"
          />
        )
    }
  }

  render() {
    const { selectedEvent, propsJson } = this.state
    const definitions = EventManager.getEventDefinitions()
    return (
      <div>
        <Select
          value={selectedEvent}
          renderValue={event => event.eventName}
          onChange={this.onSelectEvent}
          style={{ zIndex: 9999 }}
        >
          {definitions.map(event => (
            <MenuItem key={event.definition.type} value={event}>
              {event.eventName}
            </MenuItem>
          ))}
        </Select>

        {this.renderEventContentForm()}

        <Button onClick={this.handleDispatch} disabled={!propsJson || !selectedEvent}>
          Dispatch event
        </Button>
      </div>
    )
  }
}

export default ReacticoonEventRunner
