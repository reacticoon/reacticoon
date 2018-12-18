import React from 'react'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {},
})

const CheckupReport = ({ report, classes }) => (
  <div className={classes.root}>
    {report && report.url && (
      <iframe
        src={report.url}
        frameborder="0"
        style={{ width: '100%', height: window.screen.height / 1.6, }}
      />
    )}
  </div>
)

export default withStyles(styles)(CheckupReport)
