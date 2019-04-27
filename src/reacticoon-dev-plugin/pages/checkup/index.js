import React from 'react'

import Page from '../../components/Page'

import Section from '../../components/Section'
import CheckupView from './view/CheckupView'

class CheckupPage extends React.Component {
  render() {
    return (
      <Page pageTitle={`CheckupPage`}>
        <Section.Container>
          <Section title="About">
            This report is equivalant to running the command: `yarn reacticoon checkup`
          </Section>

          <Section title="Checkup">
            <CheckupView />
          </Section>
        </Section.Container>
      </Page>
    )
  }
}

export default CheckupPage
