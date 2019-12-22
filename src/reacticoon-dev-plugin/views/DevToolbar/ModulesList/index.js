import React from 'react'
import map from 'lodash/map'

import { Link } from 'reacticoon/routing'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import { getModules } from 'reacticoon/module/config'

const ModulesList = () => (
  <div>
    <p>
      Only the loaded modules are displayed here:
      <ul>
        <li>* Modules that are registered on your app/config/modules</li>
        <li>
          * Modules that has been lazy-loaded since your last reload of the page (TODO: link doc)
        </li>
      </ul>
    </p>
    <Table>
      <TableBody>
        {map(getModules(), (module, moduleName) => (
          <TableRow module={module} key={moduleName}>
            <TableCell>
              <Link
                to={Link.getRoute('REACTICOON_MODULE')}
                params={{ moduleName: module.name }}
                newTab
              >
                {module.name}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)

export default ModulesList
