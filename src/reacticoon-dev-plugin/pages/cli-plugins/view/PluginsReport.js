import React from 'react'

import Pre from '../../components/Pre'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {

  },
})

const PluginsReport = ({ pluginsReport, classes }) => (
  <div className={classes.root}>
    {/* TODO: list plugins + one page per plugin */}
    <Pre content={pluginsReport} />
  </div>
)

export default withStyles(styles)(PluginsReport)