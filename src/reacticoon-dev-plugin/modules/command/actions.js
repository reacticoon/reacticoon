import { createApiCallAction } from 'reacticoon/action'
import ReacticoonDevApi from '../api/ReacticoonDevApi'

export const runCommand = createApiCallAction(
  'ReacticoonDev::CheckuCommandModule::checkup',
  command => ReacticoonDevApi.command(command)
);