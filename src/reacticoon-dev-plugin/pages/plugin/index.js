import React from 'react'

import { getPlugin } from 'reacticoon/plugin'
import Page from '../components/Page'
import PluginView from './view/PluginView'

class PluginsPage extends React.Component {

  render() {
    const props = this.props
    const plugin = getPlugin(props.params.pluginName)

    return (
      <Page
        pageTitle={`Plugin - Detail`}
      >
        <PluginView
          plugin={plugin}
          config={plugin.getConfig()}
        />
      </Page>
    )
  }
}

export default PluginsPage