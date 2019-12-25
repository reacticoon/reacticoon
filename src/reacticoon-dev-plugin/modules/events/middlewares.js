import { createMiddleware } from 'reacticoon/middleware'
import { addErrorFlashMessage } from 'reacticoon-plugins/reacticoon-flash-messages/src/service'
import { saveEvent } from './actions'

/**
 * Creates a flash message for the important Reacticoon events, such as exceptions.
 */
export const eventsMiddleware = createMiddleware('eventsMiddleware', saveEvent, ({ action }) => {
  const eventsToNotify = [
    'REACTICOON::LOG::EXCEPTION', // TODO: use constant
  ]

  const event = action.payload.event
  if (eventsToNotify.indexOf(event.type) !== -1) {
    switch (event.type) {
      case 'REACTICOON::LOG::EXCEPTION': // TODO: use constant
        addErrorFlashMessage({
          text: `${event.data.exceptionMessage}`,
          data: event,
        })
        break
    }
  }
})
