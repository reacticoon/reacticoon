import { getEnv } from './environment'

export const __DEV__ = process.env.__DEV__ || process.env.NODE_ENV !== 'production'

//
// the version set on the app package.json
//
export const __VERSION__ = process.env.__VERSION__

export const __REACTICOON_VERSION__ = 'TODO'

export const __APP_GIT_COMMIT__ = process.env.__APP_GIT_COMMIT__

export const __APP_GIT_BRANCH__ = process.env.__APP_GIT_BRANCH__

export const getReacticoonWebsiteUrl = () => process.env.__REACTICOON_DOC_URL__

export const getReacticoonOrganisationUrl = () => process.env.__REACTICOON_GITHUB_ORGANISATION_URL__

export const getReacticoonRepositoryUrl = () => process.env.__REACTICOON_REPOSITORY_URL__

export const getEnvVar = envVar => getEnv()[envVar]
