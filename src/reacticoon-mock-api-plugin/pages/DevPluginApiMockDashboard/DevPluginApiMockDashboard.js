import React from 'react'

import Page from 'reacticoon/reacticoon-dev-plugin/components/Page'
import CommandContainer from 'reacticoon/reacticoon-dev-plugin/modules/command/view/CommandContainer'

class DevPluginApiMockDashboard extends React.Component {
  render() {
    return (
      <Page title="Api mock dashboard">
        It works !
        <CommandContainer command="MOCKAPI::LIST_FILES">
          {({ report }) => <div>{JSON.stringify(report, null, 2)}</div>}
        </CommandContainer>
      </Page>
    )
  }
}

export default DevPluginApiMockDashboard
