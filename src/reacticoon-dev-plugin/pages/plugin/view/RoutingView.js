import React from 'react'

import isEmpty from 'lodash/isEmpty'
import { getRoutes } from 'reacticoon/routing'

import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const RoutingView = ({ routing }) => isEmpty(routing.routes) ? (
  <Typography>
    No routes for this plugin.
  </Typography>
) : (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Path</TableCell>
        <TableCell>Auth required</TableCell>
        <TableCell>Disabled</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {routing.routes.map(route => (
        <TableRow>
          <TableCell>{route.definition.name}</TableCell>
          <TableCell>{route.definition.path}</TableCell>
          <TableCell>{route.definition.authRequired ? "yes" : "no"}</TableCell>
          <TableCell>{route.definition.disabled ? "active" : "disabled"}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export default RoutingView