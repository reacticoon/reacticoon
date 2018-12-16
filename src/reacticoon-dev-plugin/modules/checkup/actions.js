import { createApiCallAction } from 'reacticoon/action'
import ReacticoonDevApi from '../api/ReacticoonDevApi'

export const runCheckup = createApiCallAction(
  'ReacticoonDev::CheckupModule::checkup',
  ReacticoonDevApi.checkup()
);