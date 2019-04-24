/**
 * middleware that ensure that the action follows the [flux-standard-action](https://github.com/redux-utilities/flux-standard-action)
 */
import { isFSA } from '../../action/actionValidation'
import { generateDocUrl } from '../../dev/doc'

const crashReporter = store => next => action => {
  if (!isFSA(action)) {
    // TODO: link to reacticoon doc
    console.warn(
      `The action ${type} does not follow the flux-standard-action.
      Look at ${generateDocUrl(
        'action'
      )} and https://github.com/redux-utilities/flux-standard-action
      `
    )
  }
}

export default crashReporter
