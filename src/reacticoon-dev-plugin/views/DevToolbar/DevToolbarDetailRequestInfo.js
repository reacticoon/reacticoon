import React from 'react'

import RoutingDebugger from '../../RoutingDebugger'
import isEmpty from 'lodash/isEmpty'
import { getQueryFromUri } from 'reacticoon/routing'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {},
})

const DevToolbarDetailRequestInfo = ({ route, params, classes }) => {
  const query = getQueryFromUri(window.location.href)

  return (
    <div className={classes.root}>
      {route.path}

      {/* PARAMS */}
      <div>{isEmpty(params) ? <p>No parameters</p> : JSON.stringify(params, null, 2)}</div>

      {/* QUERY PARAMS */}
      <div>{isEmpty(query) ? <p>No query parameters</p> : JSON.stringify(query, null, 2)}</div>

      {/* TODO: better display */}
      <div>
        <h3>Historique des routes:</h3>
        <pre>{JSON.stringify(RoutingDebugger.getRoutesHistory(), null, 2)}</pre>
      </div>
    </div>
  )
}

export default withStyles(styles)(DevToolbarDetailRequestInfo)
