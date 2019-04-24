import React from 'react'

import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {},
})

const CheckupReport = ({ report, classes }) => (
  <div className={classes.root}>
    {report && report.url && (
      <iframe
        title="Checkup Report"
        src={report.url}
        frameborder="0"
        style={{ width: '100%', height: window.screen.height / 1.6, }}
      />
    )}
  </div>
)

export default withStyles(styles)(CheckupReport)
