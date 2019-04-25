import React from 'react'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    cursor: 'pointer',
  },
})

const Event = ({ event, classes, onClick }) => (
  <div onClick={onClick} className={classes.root}>
    [{event.__readableDate}] {event.eventName}
  </div>
)

export default withStyles(styles)(Event)
