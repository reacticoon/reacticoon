import React from 'react'

import classNames from 'classnames'
import Pre from '../../components/Pre'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
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