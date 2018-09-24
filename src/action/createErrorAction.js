import createActionBuilder from './createActionBuilder'

/**
 * Creates an error action. createActionThis function requires the following parameters:
 * - type {string} the action type
 * - data {object|func} A function that returns the payload or an object that contains the payload and meta
 * 
 * Note: The payload must contain an error object (following the flux-standard-action)
 */
const createErrorAction = createActionBuilder({
  isError: false,
})

export default createErrorAction
