import React from 'react'

import Page from '../../components/Page'
import Section from '../../components/Section'
import ReportView from './view/ReportView'

class BundlePhobiaPage extends React.Component {
  render() {
    return (
      <Page pageTitle={`Bundle Phobia`}>
        <Section.Container>
          <Section title="About" />

          <Section title="Report">
            <ReportView />
          </Section>
        </Section.Container>
      </Page>
    )
  }
}

export default BundlePhobiaPage
