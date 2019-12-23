import React from 'react'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  fullHeight: {
    height: '100%',
  },
  header: {
    textTransform: 'uppercase',
    color: grey['500'],
    borderBottom: '1px solid #ccc',
    paddingBottom: theme.spacing.unit,
  },
  content: {
    paddingTop: theme.spacing.unit * 2,
  },
})

const Section = ({ title, grid = { xs: 12 }, classes, children }) => (
  <Grid item {...grid}>
    <Card className={classes.root}>
      <div className={classes.header}>{title}</div>

      <div className={classes.content}>{children}</div>
    </Card>
  </Grid>
)

const SectionWithStyles = withStyles(styles)(Section)

SectionWithStyles.Container = ({ children, ...otherProps }) => (
  <Grid container spacing={2} {...otherProps}>
    {children}
  </Grid>
)

export default SectionWithStyles
