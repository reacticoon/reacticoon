import React from 'react'

import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const EventsHandlerView = ({ eventsHandler }) => isEmpty(eventsHandler) ? (
  <Typography>
    No eventsHandler for this plugin.
  </Typography>
) : (
  <div>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Event type</TableCell>
          <TableCell>Event description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {map(eventsHandler, ({ name, EVENT }, index) => (
          <TableRow key={index}>
            <TableCell>{name}</TableCell>
            <TableCell>{EVENT.type}</TableCell>
            <TableCell>{EVENT.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)

export default EventsHandlerView