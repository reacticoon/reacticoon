import React from 'react'

import { Link } from 'reacticoon/routing'
import Page from '../components/Page'
import Grid from '@material-ui/core/Grid'
import Section from '../components/Section'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import modules from 'app/config/modules'

class MyAppPage extends React.Component {

  render() {
    return (
      <Page
        pageTitle={`Dashboard`}
      >
        <Grid container spacing={16}>
          <Section title="Info" grid={{ xs: 6 }}>
          </Section>

          <Section title="Modules">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {modules.map((module, index) => (
                  <TableRow module={module}>
                    <TableCell>
                      <Link 
                        to={Link.getRoute('REACTICOON_MODULE')} 
                        params={{ moduleName: module.name }}
                      >
                        {module.name}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Section>

          <Section title="Entities">
          </Section>

          <Section title="Middlewares">
          </Section>
        </Grid>
      </Page>
    )
  }
}

export default MyAppPage