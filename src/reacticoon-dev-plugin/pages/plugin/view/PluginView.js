import React from 'react'

import Typography from '@material-ui/core/Typography'
import Section from '../../../components/Section'
import Pre from '../../../components/Pre'
import ModulesView from './ModulesView'
import RoutingView from './RoutingView'
import EventsView from './EventsView'
import EventsHandlerView from './EventsHandlerView'

const PluginView = ({ plugin, config }) => (
  <Section.Container>
    <Section title="Info">
      <Typography variant="h3">{plugin.name}</Typography>

      <Typography>{plugin.description}</Typography>
    </Section>

    <Section title="Config">
      <Pre content={config} />
    </Section>

    <Section title="Modules">
      <ModulesView modules={plugin.modules} />
    </Section>

    <Section title="Routing">
      <RoutingView routing={plugin.routing} />
    </Section>

    <Section title="Events">
      <EventsView events={plugin.events} />
    </Section>

    <Section title="Events handler">
      <EventsHandlerView eventsHandler={plugin.eventsHandler} />
    </Section>
  </Section.Container>
)

export default PluginView
