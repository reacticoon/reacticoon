import { createAction } from 'reacticoon/action'

export const setUserContext = createAction(
  'ReacticoonDev::EventsModule::setUserContext',
  userContext => ({
    userContext,
  })
)

export const clearUserContext = createAction('ReacticoonDev::EventsModule::clearUserContext', {})
