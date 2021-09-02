import React from 'react'
import { getEnv } from './environment'

export const getProcessEnv = envVarName => process.env[envVarName]

// tODO: remove
export const __DEV__ = process.env.__DEV__ || process.env.NODE_ENV !== 'production'

export const __ENV__ = process.env.__ENV__

//
// the version set on the app package.json
//
export const __VERSION__ = process.env.__VERSION__
window.__VERSION__ = process.env.__VERSION__

export const __REACTICOON_VERSION__ = 'TODO'

export const __APP_GIT_COMMIT__ = process.env.__APP_GIT_COMMIT__
window.__APP_GIT_COMMIT__ = process.env.__APP_GIT_COMMIT__

export const __APP_GIT_BRANCH__ = process.env.__APP_GIT_BRANCH__

export const getReacticoonWebsiteUrl = () => process.env.__REACTICOON_DOC_URL__

export const getReacticoonOrganisationUrl = () => process.env.__REACTICOON_GITHUB_ORGANISATION_URL__

export const getReacticoonRepositoryUrl = () => process.env.__REACTICOON_REPOSITORY_URL__

export const isLocalhost = () => window.location.hostname === 'localhost'

// see https://reactjs.org/docs/faq-versioning.html
export const getReactVersion = () => React.version

// for 16.4.2 -> 16.4
export const getReactVersionMinor = () => {
  // remove patch version
  const versions = React.version.split('.')
  versions.splice(-1, 1)
  return versions.join('.')
}

export const getReactVersionDocLink = () => `https://reactjs.org/version/${getReactVersionMinor()}`

export const getEnvVar = envVar => getEnv()[envVar]

//
// Below we handle some common envs.
// We highly recommand to use one of those defined environments:
// - Plugins that you use could have specific behavior according to the environment.
//
export const isEnvLocal = () => __ENV__ === 'local'
export const isEnvDev = () => __ENV__ === 'dev' || __ENV__ === 'development'
export const isEnvPreprod = () => __ENV__ === 'preprod'
export const isEnvQA = () => __ENV__ === 'qa'
export const isEnvCI = () => __ENV__ === 'ci'
export const isEnvProduction = () => __ENV__ === 'prod' || __ENV__ === 'production'
export const isEnvTesting = () => __ENV__ === 'testing'

export const getProjectSrcPath = () => process.env.PROJECT_SRC

//
// INFO DEBUG TRACE
//
const TraceLevel = {
  ERROR : 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
  TRACE: 'TRACE',
}

const TraceLevelIndex = [
  TraceLevel.ERROR,
  TraceLevel.WARN,
  TraceLevel.INFO,
  TraceLevel.DEBUG,
  TraceLevel.TRACE,
]

export const getLogLevel = () => getProcessEnv('LOG_LEVEL')?.toUpperCase() || (__DEV__ ? TraceLevel.DEBUG : TraceLevel.ERROR)

export const isTraceLogLevel = () => TraceLevelIndex.indexOf(getLogLevel()) >= TraceLevelIndex.indexOf(TraceLevel.TRACE)
export const isDebugLogLevel = () =>  TraceLevelIndex.indexOf(getLogLevel()) >= TraceLevelIndex.indexOf(TraceLevel.DEBUG)
export const isWarnLogLevel = () =>  TraceLevelIndex.indexOf(getLogLevel()) >= TraceLevelIndex.indexOf(TraceLevel.WARN)