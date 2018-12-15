import React from 'react';

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Section from '../../components/Section'
import Pre from '../../components/Pre'
import ModulesView from './ModulesView'
import RoutingView from './RoutingView'
import EventsView from './EventsView'

const PluginView = ({ plugin, config }) => (
  <Grid container spacing={16}>

    <Section title="Info">
      <Typography variant="h3">{plugin.name}</Typography> 

      <Typography>
        {plugin.description}
      </Typography>
    </Section>

    <Section title="Config">
      <Pre
        content={config}
      />
    </Section>

    <Section title="Modules">
      <ModulesView
        routing={plugin.modules}
      />
    </Section>

    
    <Section title="Routing">
      <RoutingView 
        routing={plugin.routing}
      />
    </Section>

    <Section title="Events">
      <EventsView
        events={plugin.events}
      />
    </Section>
  </Grid>
)

export default PluginView;