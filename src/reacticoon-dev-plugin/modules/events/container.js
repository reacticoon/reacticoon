import { createModuleContainer } from 'reacticoon/container'
import EventsModule from './'

const container = createModuleContainer('ReacticoonDevEventsContainer', EventsModule, {
  selectors: { events: 'getEvents' },
  actions: ['saveEvent'],
})

export default container
