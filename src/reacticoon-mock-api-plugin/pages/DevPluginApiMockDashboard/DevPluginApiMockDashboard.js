import React from 'react'

import Page from 'reacticoon/reacticoon-dev-plugin/components/Page'
import Section from 'reacticoon/reacticoon-dev-plugin/components/Section'
import FileTreeView from 'reacticoon/reacticoon-dev-plugin/views/FileTreeView'

class DevPluginApiMockDashboard extends React.Component {
  render() {
    return (
      <Page title="Api mock dashboard">
        <Section title="Mocked files">
          <FileTreeView command="MOCKAPI::LIST_FILES" />
        </Section>
      </Page>
    )
  }
}

export default DevPluginApiMockDashboard
