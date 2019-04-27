import React from 'react'

import map from 'lodash/map'
import { getModule } from 'reacticoon/module'
import Page from '../../components/Page'
import Section from '../../components/Section'
import { API_CALL } from 'reacticoon/api'
import Grid from '@material-ui/core/Grid'

class ModulePage extends React.Component {
  render() {
    const props = this.props
    const module = getModule(props.params.moduleName)

    const reducer = module.content.reducer

    return (
      <Page pageTitle={`Module - Detail`}>
        <Grid container spacing={16}>
          <h1>{module.name}</h1>

          <Section title="Actions">
            {map(module.content.actions, (action, actionName) => (
              <div key={actionName}>
                {actionName}

                {action.TYPE === API_CALL ? `Api call: ${action.__type}` : action.TYPE}

                {JSON.stringify(action.__parameters)}

                {/* <Pre code={action.toString()}/> */}
              </div>
            ))}
          </Section>

          <Section title="Middlewares">
            {map(module.content.middlewares, (middleware, middlewareName) => (
              <div key={middlewareName}>{middlewareName}</div>
            ))}
          </Section>

          <Section title="Selectors">
            {map(module.content.selectors, (selector, selectorName) => (
              <div key={selectorName}>{selectorName}</div>
            ))}
          </Section>

          {reducer && (
            <Section title="Reducer">
              <div>
                {reducer.__fnMap &&
                  map(reducer.__fnMap, (func, event) => (
                    <div key={event}>
                      {event}: {func.name}
                    </div>
                  ))}
              </div>
            </Section>
          )}
        </Grid>
      </Page>
    )
  }
}

export default ModulePage
