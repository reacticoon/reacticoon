import React from 'react'

import startsWith from 'lodash/startsWith'
import { getRoutes, Link, getRouteNameForRoute } from 'reacticoon/routing'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Page from '../../components/Page'
import Section from '../../components/Section'
import LaunchEditorButton from '../../components/LaunchEditorButton'

class PluginsPage extends React.Component {
  render() {
    return (
      <Page pageTitle="Routes">
        <Section.Container>
          <Section title="Routes">
            <LaunchEditorButton src="/config/routes.js" label="Open routes" />
            <LaunchEditorButton src="/config/RoutingEnum.js" label="Open RoutingEnum" />

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Path</TableCell>
                  <TableCell>Plugin</TableCell>
                  <TableCell>Auth required</TableCell>
                  <TableCell>Disabled</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getRoutes()
                  // do not display our plugin pages, prefixed with /_rc/
                  .filter(route => !startsWith(route.definition.path, '/_rc'))
                  .map((route, index) => {
                    {
                      /* debugger */
                    }
                    return (
                      <TableRow key={index} route={route}>
                        <TableCell>{getRouteNameForRoute(route)}</TableCell>
                        <TableCell>{route.definition.path}</TableCell>
                        <TableCell>
                          {route.definition.__plugin && (
                            <Link
                              to={Link.getRoute('REACTICOON_PLUGIN')}
                              params={{ pluginName: route.definition.__plugin }}
                            >
                              {route.definition.__plugin}
                            </Link>
                          )}
                        </TableCell>
                        <TableCell>{route.definition.authRequired ? 'yes' : 'no'}</TableCell>
                        <TableCell>{route.definition.disabled ? 'active' : 'disabled'}</TableCell>
                        <TableCell>
                          {/* TODO: */}
                          {/* <LaunchEditorButton src={route.handler} label="Open route code" /> */}
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </Section>
        </Section.Container>
      </Page>
    )
  }
}

export default PluginsPage
