import { createAction } from 'reacticoon/action'

export const saveEvent = createAction('ReacticoonDev::EventsModule::saveEvent', event => ({
  event,
}))
