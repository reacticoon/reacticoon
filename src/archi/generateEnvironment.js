import isFunction from 'lodash/isFunction'
import { getProcessEnv } from 'reacticoon/environment'
import appEnv from 'app-environment'

function generateEnvironment() {
  const data = isFunction(appEnv) ? appEnv({ getProcessEnv }) : appEnv
  return data
}

export default generateEnvironment
