/**
 * middleware that ensure that the action follows the [flux-standard-action](https://github.com/redux-utilities/flux-standard-action)
 *
 * TODO: use this middleware
 */
import { isFSA } from '../../action/actionValidation'
import { EventManager } from '../../event'
import { generateDocUrl } from '../../dev/doc'

const actionStandardMiddleware = store => next => action => {
  if (!isFSA(action)) {
    // TODO: link to reacticoon doc
    EventManager.dispatch(EventManager.Event.LOG_WARN, {
      type: `The action ${action.type} does not follow the flux-standard-action.`,
      detail: `
        Look at ${generateDocUrl(
          'action'
        )} and https://github.com/redux-utilities/flux-standard-action
      `,
    })
  }
}

export default actionStandardMiddleware
