import isFunction from 'lodash/isFunction'
import { getProcessEnv } from 'reacticoon/environment'
// TODO:
// import appEnv from 'app-environment'
import appEnv from 'app/config/environment.local'

function generateEnvironment() {
  const data = isFunction(appEnv) ? appEnv({ getProcessEnv }) : appEnv
  return data
}

export default generateEnvironment
