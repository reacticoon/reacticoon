import React from 'react'

import Grid from '@material-ui/core/Grid'
import Page from '../../components/Page'
import Section from '../../components/Section'
import ReportView from './view/ReportView'

class CheckupPage extends React.Component {
  render() {
    return (
      <Page pageTitle={`Analyze build`}>
        <Grid container spacing={16}>
          <Section title="About">
            This report is equivalant to running the command: `yarn reacticoon analyze-build`. Note
            that we will analyze the latest build (`yarn build`) made. Make sure you have build your
            app recently
          </Section>

          <Section title="Report">
            <ReportView />
          </Section>
        </Grid>
      </Page>
    )
  }
}

export default CheckupPage
