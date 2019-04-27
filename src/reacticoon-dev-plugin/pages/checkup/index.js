import React from 'react'

import Page from '../../components/Page'

import Section from '../../components/Section'
import Grid from '@material-ui/core/Grid'
import CheckupView from './view/CheckupView'

class CheckupPage extends React.Component {
  render() {
    return (
      <Page pageTitle={`CheckupPage`}>
        <Grid container spacing={16}>
          <Section title="About">
            This report is equivalant to running the command: `yarn reacticoon checkup`
          </Section>

          <Section title="Checkup">
            <CheckupView />
          </Section>
        </Grid>
      </Page>
    )
  }
}

export default CheckupPage
