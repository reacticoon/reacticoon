import { getEnv } from './environment'

export const __DEV__ = process.env.__DEV__ || process.env.NODE_ENV !== 'production'

//
// the version set on the app package.json
//
export const __VERSION__ = process.env.__VERSION__

export const getEnvVar = envVar => getEnv()[envVar]
