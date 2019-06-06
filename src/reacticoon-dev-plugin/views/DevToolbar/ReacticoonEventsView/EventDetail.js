import React from 'react'

import isString from 'lodash/isString'

import JsonView from 'reacticoon/reacticoon-dev-plugin/components/JsonView'
import { withStyles } from '@material-ui/core/styles'
import { EventManager, isSameEvent } from 'reacticoon/event'

import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {},
})

const getEventDataJson = eventData => {
  if (isString(eventData)) {
    return JSON.parse(eventData)
  }

  return eventData
}

const getDetail = event => {
  const jsonData = getEventDataJson(event.data)
  if (isSameEvent(EventManager.Event.LOG_EXCEPTION, event)) {
    return (
      <div>
        <p>{jsonData.exceptionMessage}</p>
        <pre>{jsonData.exceptionStack}</pre>
      </div>
    )
  }
  return (
    <JsonView
      style={{
        maxWidth: '460px',
        display: 'inline-block',
      }}
      json={jsonData}
    />
  )
}

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

    {getDetail(event)}
  </div>
)

export default withStyles(styles)(EventDetail)
