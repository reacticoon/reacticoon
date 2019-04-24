import React from 'react'

import { getRoutes, Link, getRouteNameForRoute } from 'reacticoon/routing'
import Page from '../components/Page'
import Section from '../components/Section'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

class PluginsPage extends React.Component {
  
  render() {
    return (
      <Page
        pageTitle="Routes"
      >
        <Grid container>
          <Section title="Routes">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Path</TableCell>
                  <TableCell>Plugin</TableCell>
                  <TableCell>Auth required</TableCell>
                  <TableCell>Disabled</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getRoutes().map((route, index) => (
                  <TableRow key={index}>
                    <TableCell>{getRouteNameForRoute(route)}</TableCell>
                    <TableCell>{route.definition.path}</TableCell>
                    <TableCell>
                      {route.definition.__plugin && (
                        <Link to={Link.getRoute('REACTICOON_PLUGIN')} params={{pluginName: route.definition.__plugin}}>
                          {route.definition.__plugin}
                        </Link>
                      )}
                    </TableCell>
                    <TableCell>{route.definition.authRequired ? "yes" : "no"}</TableCell>
                    <TableCell>{route.definition.disabled ? "active" : "disabled"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Section>
        </Grid>
      </Page>
    )
  }
}

export default PluginsPage