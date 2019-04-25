import React from 'react'

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
    {/* TODO: use json view */}
    <pre>{JSON.stringify(event.data, null, 2)}</pre>
  </div>
)

export default withStyles(styles)(EventDetail)
