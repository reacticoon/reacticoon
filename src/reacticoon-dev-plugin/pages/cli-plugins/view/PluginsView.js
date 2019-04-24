import React from 'react'

import CommandContainer from '../../../modules/command/view/CommandContainer'
import PluginsReport from './PluginsReport'

const ReportView = () => (
  <CommandContainer command="PLUGINS">
    {({ report }) => <PluginsReport pluginsReport={report} />}
  </CommandContainer>
)

export default ReportView
