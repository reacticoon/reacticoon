import isNil from 'lodash/isNil'

/**
 * Returns true if the given objectToTest is an actionType.
 * An actionType must have the `isActionType` boolean
 * @param {any} actionType
 */
const isActionType = objectToTest => {
  return !isNil(objectToTest) && objectToTest.isActionType
}

export default isActionType
