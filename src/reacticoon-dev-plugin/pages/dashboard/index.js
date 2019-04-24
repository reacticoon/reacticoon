import React from 'react'

import { __VERSION__, __REACTICOON_VERSION__, getEnv } from 'reacticoon/environment'
import {
  getReacticoonWebsiteUrl,
  getReacticoonOrganisationUrl,
  getReacticoonRepositoryUrl,
  getReactVersion,
  getReactVersionDocLink,
} from 'reacticoon/environment'
import Page from '../components/Page'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Pre from '../components/Pre'
import Section from '../components/Section'

class DashboardPage extends React.Component {
  render() {
    return (
      <Page pageTitle={`Dashboard`}>
        <Grid container spacing={16}>
          <Section title="Info" grid={{ xs: 6 }}>
            <List>
              <ListItem>App version: {__VERSION__}</ListItem>
              <ListItem>Reacticoon version: {__REACTICOON_VERSION__}</ListItem>
              <ListItem>
                React version:{' '}
                <a href={getReactVersionDocLink()} target="_blank">
                  {getReactVersion()}
                </a>
              </ListItem>
            </List>
          </Section>

          <Section title="Help" grid={{ xs: 6 }}>
            <List>
              <ListItem>
                <a href={getReacticoonWebsiteUrl()} target="_blank" rel="noopener noreferer">
                  Reacticoon website
                </a>
              </ListItem>

              <ListItem>
                <a
                  href={`${getReacticoonRepositoryUrl()}/issues`}
                  target="_blank"
                  rel="noopener noreferer"
                >
                  Github - Issues
                </a>
              </ListItem>

              <ListItem>
                <a href={getReacticoonOrganisationUrl()} target="_blank" rel="noopener noreferer">
                  Reacticoon on Github
                </a>
              </ListItem>
            </List>
          </Section>

          <Section title="Environment">
            <Pre content={getEnv()} />
          </Section>

          <Section title="Process environment">
            <Pre content={process.env} />
          </Section>
        </Grid>
      </Page>
    )
  }
}

export default DashboardPage
