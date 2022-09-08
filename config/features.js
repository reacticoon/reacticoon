//
// Reacticoon feature flags.
//

module.exports = api => ({
  FEATURE_REACTICOON_USER_TIMING_API: !api.env.isEnvProduction,
  // true if working on reacticoon or a reacticoon plugin
  // TODO: put to false when building reacticoon.
  FEATURE_REACTICOON_DEV_MODE: true,
})
