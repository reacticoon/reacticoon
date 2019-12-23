import React from 'react'

import { getProjectSrcPath } from 'reacticoon/environment'
import CommandContainer from 'reacticoon/reacticoon-dev-plugin/modules/command/view/CommandContainer'
import Button from '@material-ui/core/Button'

const LaunchEditorButton = ({ src, label }) => (
  <CommandContainer
    manualRun
    command="DEV_TOOLS::LAUNCH_EDITOR"
    payload={{
      fileName: `${getProjectSrcPath()}/${src}`,
    }}
  >
    {({ runCommand }) => <Button onClick={runCommand}>{label}</Button>}
  </CommandContainer>
)

export default LaunchEditorButton
