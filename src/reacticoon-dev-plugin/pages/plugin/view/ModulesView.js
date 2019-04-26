import React from 'react'

import isEmpty from 'lodash/isEmpty'

import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const ModulesView = ({ modules }) =>
  isEmpty(modules) ? (
    <Typography>No modules for this plugin.</Typography>
  ) : (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modules.map(module => (
            <TableRow>
              <TableCell>{module.name}</TableCell>
              <TableCell>{module.content.description || ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

export default ModulesView
