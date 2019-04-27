import React from 'react'

import JsonView from 'reacticoon/reacticoon-dev-plugin/components/JsonView'
import { withStyles } from '@material-ui/core/styles'
import { EventManager } from 'reacticoon/event'

import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {},
})

const EventDetail = ({ event, classes }) => (
  <div className={classes.root}>
    <div>
      [{event.__readableDate}] {event.eventName}
      <br />
      <p>{event.definition.description}</p>
    </div>
    <div>
      <Button
        onClick={() => {
          EventManager.dispatch(event.definition, event.data)
        }}
      >
        Run again
      </Button>
    </div>

    <JsonView json={event.data} />
  </div>
)

export default withStyles(styles)(EventDetail)
