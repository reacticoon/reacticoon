import React from 'react'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import WarnIcon from '@material-ui/icons/Warning'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {

  },
  check: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  checkHeader: {

  },
  name: {

  },
  description: {
    paddingTop: theme.spacing.unit,
  },
  checkContent: {
    paddingTop: theme.spacing.unit * 2,
  },
  checkError: {

  },
  checkResults: {
    marginLeft: theme.spacing.unit,
  },
  checkResult: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
  iconGood: {
    color: theme.app.colors.good,
  },
  iconError: {
    color: theme.app.colors.error,  
  },
  iconWarn: {
    color: theme.app.colors.warn,
  },
})

const Icon = ({ result, classes }) => {
  switch (result.type) {
    case 'GOOD':
      return <CheckIcon className={classNames(classes.icon, classes.iconGood)} />

    case 'ERROR':
      return <CloseIcon className={classNames(classes.icon, classes.iconError)} />

    case 'WARN':
      return <WarnIcon className={classNames(classes.icon, classes.iconWarn)} />

    default: 
      return null
  }
}

const CheckupReport = ({ report, classes }) => (
  <div className={classes.root}>
    {report.checks.map((check, index) => (
      <div className={classes.check} key={index}>
        <div className={classes.checkHeader}>
          <Typography variant="h2" className={classes.name}>
            {check.data.name}
          </Typography>

          <Typography className={classes.description}>
            {check.data.description}
          </Typography>
        </div>

        <div className={classes.checkContent}>
          {check.error && (
            <div className={classes.checkError}>
              {check.error}
            </div>
          )}
          <div className={classes.checkResults}>
            {check.results && check.results.map((result, index) => (
              <div className={classes.checkResult} key={index}>
                <Icon result={result} classes={classes} />
                <Typography>
                  {result.message}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
)

export default withStyles(styles)(CheckupReport)