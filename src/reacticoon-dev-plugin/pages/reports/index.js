import React from 'react'

import { Link } from 'reacticoon/routing'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Page from '../components/Page'
import Section from '../components/Section'

class ReportsPage extends React.Component {
  render() {
    return (
      <Page pageTitle={`Reports`}>
        <Grid container>
          <Section title="Reports">
            You can use the following commands:
            <List>
              <ListItem>
                <Link to={Link.getRoute('REACTICOON_REPORT_CHECKUP')}>Checkup</Link>
              </ListItem>

              <ListItem>
                <Link to={Link.getRoute('REACTICOON_REPORT_CLI_PLUGINS')}>Cli plugins</Link>
              </ListItem>

              <ListItem>
                <Link to={Link.getRoute('REACTICOON_REPORT_ANALYZE_BUILD')}>Analyze build</Link>
              </ListItem>
            </List>
            {/* TODO: link to website documentation */}
          </Section>
        </Grid>
      </Page>
    )
  }
}

export default ReportsPage
