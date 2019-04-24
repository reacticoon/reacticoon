import createActionBuilder from './createActionBuilder'

/**
 * Creates an action. createAction requires the following parameters:
 * - type {string} the action type
 * - data {object|func} A function that returns the payload or an object that contains the payload and meta
 */
const createAction = createActionBuilder({
  isError: false,
})

export default createAction
