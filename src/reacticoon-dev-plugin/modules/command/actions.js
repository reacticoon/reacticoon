import { createApiCallAction } from 'reacticoon/action'
import ReacticoonDevApi from '../api/ReacticoonDevApi'

export const runCommand = createApiCallAction(
  'ReacticoonDev::CommandModule::command',
  (id, command, options) => ReacticoonDevApi.command(command, options),
  (id, command) => ({
    id,
    command,
  })
)
