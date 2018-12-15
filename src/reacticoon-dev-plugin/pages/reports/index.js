import React from 'react'

import Page from '../components/Page'

import Section from '../components/Section'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

class ReportsPage extends React.Component {

  render() {
    return (
      <Page
        pageTitle={`Reports`}
      >
        <Grid container>
          <Section title="Reports">
            You can use the following commands:

            <List>
              <ListItem>
                yarn reacticoon checkup
              </ListItem>
              <ListItem>
                yarn reacticoon debug-plugins
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