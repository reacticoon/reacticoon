import { createApiCallAction } from 'reacticoon/action'
import ReacticoonDevApi from '../api/ReacticoonDevApi'

export const runCommand = createApiCallAction(
  'ReacticoonDev::CommandModule::command',
  command => ReacticoonDevApi.command(command)
);