/**
 * Create an enum to use for an Api request action
 */
const createApiEnumAction = prefix => ({
  REQUEST: `${prefix}::REQUEST`,
  SUCCESS: `${prefix}::SUCCESS`,
  FAILURE: `${prefix}::FAILURE`,
  CANCEL: `${prefix}::CANCEL`,
})

export default createApiEnumAction
