import React from 'react'

import { getPlugins } from 'reacticoon/plugin'
import { Link } from 'reacticoon/routing'

import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Page from '../../components/Page'
import Section from '../../components/Section'

class PluginsPage extends React.Component {
  render() {
    return (
      <Page pageTitle="Plugins">
        <Grid container>
          <Section title="Active plugins">
            <Table>
              <TableBody>
                {getPlugins().map((pluginData, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Link
                        to={Link.getRoute('REACTICOON_PLUGIN')}
                        params={{
                          pluginName: pluginData.plugin.name,
                        }}
                      >
                        {pluginData.plugin.name}
                      </Link>
                    </TableCell>
                    <TableCell>{pluginData.plugin.description}</TableCell>
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
