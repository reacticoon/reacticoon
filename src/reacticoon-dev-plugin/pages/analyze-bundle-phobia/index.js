import React from 'react'

import Grid from '@material-ui/core/Grid'
import Page from '../../components/Page'
import Section from '../../components/Section'
import ReportView from './view/ReportView'

class BundlePhobiaPage extends React.Component {
  render() {
    return (
      <Page pageTitle={`Bundle Phobia`}>
        <Grid container spacing={16}>
          <Section title="About" />

          <Section title="Report">
            <ReportView />
          </Section>
        </Grid>
      </Page>
    )
  }
}

export default BundlePhobiaPage
